import fs from "node:fs/promises";
import path from "node:path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const PDF_URL =
  "https://rera.punjab.gov.in/pdf/registered-projects/List_of_Registered_Projects.pdf";

const OUTPUT_DIR = path.resolve("data");
const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  "rera-projects.json"
);

/*
 * Column X positions discovered from the actual Punjab RERA PDF.
 *
 * These are based on the table headers and page 282 diagnostic.
 */
const COLUMNS = [
  { key: "sno", x: 47.67 },
  { key: "district", x: 81.11 },
  { key: "promoterName", x: 162.06 },
  { key: "projectName", x: 262.99 },
  { key: "registrationNumber", x: 371.4 },
  { key: "projectType", x: 461.34 },
  { key: "projectLocation", x: 542.29 },
  { key: "promoterAddress", x: 668.22 },
  { key: "contactDetails", x: 801.6 },
];

const REGISTRATION_REGEX =
  /PBRERA[\s\-_]*[A-Z0-9]+[\s\-_]*[A-Z0-9]+/i;

function clean(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/ΓÇô/g, "-")
    .replace(/ΓÇÖ/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRegistration(value) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function getRegistration(text) {
  const match = text.match(REGISTRATION_REGEX);

  if (!match) {
    return null;
  }

  return match[0]
    .replace(/\s+/g, "")
    .replace(/_/g, "-")
    .toUpperCase();
}

/**
 * Assign an item to the nearest table column.
 *
 * We use the midpoint between neighbouring columns rather
 * than arbitrary fixed boundaries.
 */
function getColumnKey(x) {
  let best = null;
  let bestDistance = Infinity;

  for (const column of COLUMNS) {
    const distance = Math.abs(x - column.x);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = column.key;
    }
  }

  return best;
}

/**
 * Build visual lines from PDF text items.
 *
 * Items on the same Y coordinate belong to the same visual line.
 */
function buildLines(items) {
  const sorted = items
    .filter((item) => item.str?.trim())
    .map((item) => ({
      text: clean(item.str),
      x: item.transform[4],
      y: item.transform[5],
      width: item.width || 0,
    }))
    .sort((a, b) => {
      if (Math.abs(a.y - b.y) > 2.5) {
        return b.y - a.y;
      }

      return a.x - b.x;
    });

  const lines = [];

  for (const item of sorted) {
    let line = lines.find(
      (candidate) =>
        Math.abs(candidate.y - item.y) <= 2.5
    );

    if (!line) {
      line = {
        y: item.y,
        items: [],
      };

      lines.push(line);
    }

    line.items.push(item);
  }

  for (const line of lines) {
    line.items.sort((a, b) => a.x - b.x);
  }

  return lines;
}

/**
 * Identify table rows.
 *
 * A row starts whenever we find an SNo item in the first
 * column. The row continues until the next SNo.
 */
function buildRows(lines) {
  const rowStarts = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const snoItem = line.items.find(
      (item) =>
        item.x >= 40 &&
        item.x <= 65 &&
        /^\d{1,4}$/.test(item.text)
    );

    if (snoItem) {
      rowStarts.push({
        lineIndex: i,
        sno: snoItem.text,
      });
    }
  }

  const rows = [];

  for (let i = 0; i < rowStarts.length; i++) {
    const current = rowStarts[i];

    const next =
      rowStarts[i + 1];

    const start = current.lineIndex;

    const end = next
      ? next.lineIndex
      : lines.length;

    rows.push({
      sno: current.sno,
      lines: lines.slice(start, end),
    });
  }

  return rows;
}

/**
 * Convert a visual row into column-based text.
 */
function extractColumns(row) {
  const columns = {
    sno: [],
    district: [],
    promoterName: [],
    projectName: [],
    registrationNumber: [],
    projectType: [],
    projectLocation: [],
    promoterAddress: [],
    contactDetails: [],
  };

  for (const line of row.lines) {
    for (const item of line.items) {
      const key = getColumnKey(item.x);

      if (!key) continue;

      columns[key].push({
        text: item.text,
        y: item.y,
        x: item.x,
      });
    }
  }

  /*
   * Items are already approximately top-to-bottom because
   * buildLines() sorts by Y.
   *
   * Preserve their natural order.
   */
  const result = {};

  for (const [key, items] of Object.entries(columns)) {
    result[key] = clean(
      items
        .map((item) => item.text)
        .join(" ")
    );
  }

  return result;
}

/**
 * Some registration numbers are split across two PDF text
 * items:
 *
 * PBRERA-SAS81-
 * PC0180
 *
 * Clean them here.
 */
function normalizeRegistrationField(value) {
  const registration =
    getRegistration(value);

  if (registration) {
    return registration;
  }

  return clean(value);
}

/**
 * Remove obvious serial/header/footer contamination.
 */
function cleanColumnValue(value) {
  return clean(
    value
      .replace(
        /District Name|Promoter Name|Project Name|RERA Registration No|Type of Project|Project Location|Promoter Address|Contact Details of Promoter|SNo/gi,
        " "
      )
  );
}

/**
 * Parse one table row.
 */
function parseRow(row) {
  const columns =
    extractColumns(row);

  const registrationNumber =
    normalizeRegistrationField(
      columns.registrationNumber
    );

  /*
   * Rows without a RERA number aren't real project rows.
   * This filters out header/footer noise.
   */
  if (
    !registrationNumber ||
    !registrationNumber.startsWith("PBRERA")
  ) {
    return null;
  }

  return {
    registrationNumber,

    projectName:
      cleanColumnValue(
        columns.projectName
      ),

    promoterName:
      cleanColumnValue(
        columns.promoterName
      ),

    district:
      cleanColumnValue(
        columns.district
      ),

    projectType:
      cleanColumnValue(
        columns.projectType
      ),

    projectLocation:
      cleanColumnValue(
        columns.projectLocation
      ),

    promoterAddress:
      cleanColumnValue(
        columns.promoterAddress
      ),

    contactDetails:
      cleanColumnValue(
        columns.contactDetails
      ),

    source: "Punjab RERA",

    rawContext: clean(
      row.lines
        .map((line) =>
          line.items
            .map((item) => item.text)
            .join(" ")
        )
        .join(" ")
    ),

    page: row.page,
    sno: row.sno,
  };
}

async function main() {
  console.log(
    "Downloading Punjab RERA PDF..."
  );

  const response =
    await fetch(PDF_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to download PDF: ${response.status} ${response.statusText}`
    );
  }

  const buffer =
    Buffer.from(
      await response.arrayBuffer()
    );

  console.log(
    `Downloaded ${(buffer.length / 1024 / 1024).toFixed(2)} MB`
  );

  const pdf =
    await pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
    }).promise;

  console.log(
    `PDF pages: ${pdf.numPages}`
  );

  const projects = [];
  const seen = new Set();

  let totalRows = 0;
  let rowsWithRegistration = 0;

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    if (
      pageNumber === 1 ||
      pageNumber % 10 === 0
    ) {
      console.log(
        `Processing page ${pageNumber}/${pdf.numPages}...`
      );
    }

    const page =
      await pdf.getPage(
        pageNumber
      );

    const content =
      await page.getTextContent();

    const lines =
      buildLines(
        content.items
      );

    const rows =
      buildRows(lines);

    totalRows += rows.length;

    for (const row of rows) {
      row.page = pageNumber;

      const parsed =
        parseRow(row);

      if (!parsed) {
        continue;
      }

      rowsWithRegistration++;

      const normalized =
        normalizeRegistration(
          parsed.registrationNumber
        );

      if (seen.has(normalized)) {
        continue;
      }

      seen.add(normalized);

      projects.push(parsed);
    }
  }

  /*
   * Sort by SNo where possible.
   */
  projects.sort(
    (a, b) =>
      Number(a.sno || 0) -
      Number(b.sno || 0)
  );

  await fs.mkdir(
    OUTPUT_DIR,
    {
      recursive: true,
    }
  );

  const output = {
    source: "Punjab RERA",
    sourceUrl: PDF_URL,
    datasetDate: "28 August 2026",
    importedAt:
      new Date().toISOString(),

    totalProjects:
      projects.length,

    expectedProjects: 2076,

    totalRowsDetected:
      totalRows,

    rowsWithRegistration:
      rowsWithRegistration,

    projects,
  };

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      output,
      null,
      2
    ),
    "utf8"
  );

  /*
   * ==========================================
   * Diagnostics
   * ==========================================
   */

  const target =
    projects.find(
      (project) =>
        normalizeRegistration(
          project.registrationNumber
        ) ===
        normalizeRegistration(
          "PBRERA-SAS81-PC0180"
        )
    );

  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    "Punjab RERA import complete"
  );
  console.log(
    "======================================"
  );

  console.log(
    `Total rows detected: ${totalRows}`
  );

  console.log(
    `Rows with registration: ${rowsWithRegistration}`
  );

  console.log(
    `Projects parsed: ${projects.length}`
  );

  console.log(
    `Expected official total: 2076`
  );

  console.log(
    `Output: ${OUTPUT_FILE}`
  );

  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    "TARGET: PBRERA-SAS81-PC0180"
  );
  console.log(
    "======================================"
  );

  console.log(
    JSON.stringify(
      target ?? null,
      null,
      2
    )
  );

  /*
   * Show a few neighboring records.
   */
  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    "NEIGHBORING RECORDS"
  );
  console.log(
    "======================================"
  );

  const neighboring =
    projects.filter(
      (project) =>
        Number(project.sno) >= 2049 &&
        Number(project.sno) <= 2055
    );

  console.log(
    JSON.stringify(
      neighboring,
      null,
      2
    )
  );

  if (
    projects.length !== 2076
  ) {
    console.warn(
      `WARNING: Parsed ${projects.length} projects instead of 2076.`
    );
  }

  if (!target) {
    console.error(
      "ERROR: Target PBRERA-SAS81-PC0180 was not parsed."
    );
  }
}

main().catch(
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

