import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const PDF_URL =
  "https://rera.punjab.gov.in/pdf/registered-projects/List_of_Registered_Projects.pdf";

const response = await fetch(PDF_URL);

if (!response.ok) {
  throw new Error(`Download failed: ${response.status}`);
}

const buffer = Buffer.from(
  await response.arrayBuffer()
);

const pdf =
  await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  }).promise;

const page = await pdf.getPage(282);

const content =
  await page.getTextContent();

const items = content.items
  .filter((item) => item.str?.trim())
  .map((item) => ({
    text: item.str,
    x: Number(item.transform[4].toFixed(2)),
    y: Number(item.transform[5].toFixed(2)),
    width: Number(
      (item.width || 0).toFixed(2)
    ),
  }))
  .sort((a, b) => {
    if (Math.abs(a.y - b.y) > 2) {
      return b.y - a.y;
    }

    return a.x - b.x;
  });

console.log(
  `Total text items: ${items.length}`
);

console.log("");
console.log(
  "PAGE 282 — ALL PDF TEXT ITEMS"
);
console.log(
  "================================"
);

for (let i = 0; i < items.length; i++) {
  const item = items[i];

  console.log(
    `${String(i).padStart(3)} | ` +
      `x=${String(item.x).padStart(7)} | ` +
      `y=${String(item.y).padStart(8)} | ` +
      `w=${String(item.width).padStart(7)} | ` +
      JSON.stringify(item.text)
  );
}

console.log("");
console.log(
  "RECONSTRUCTED PAGE TEXT"
);
console.log(
  "================================"
);

let currentY = null;
let line = "";

for (const item of items) {
  if (
    currentY === null ||
    Math.abs(item.y - currentY) <= 2
  ) {
    line += ` ${item.text}`;
  } else {
    console.log(line.trim());

    line = item.text;
  }

  currentY = item.y;
}

if (line) {
  console.log(line.trim());
}

