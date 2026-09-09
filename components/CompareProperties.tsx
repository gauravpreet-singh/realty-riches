"use client";

import { useEffect, useState } from "react";

const COMPARE_KEY = "realty-riches-compare-properties";
const MAX_COMPARE = 4;

type ComparePropertyButtonProps = {
  propertyId: string;
  className?: string;
};

export default function ComparePropertyButton({
  propertyId,
  className = "",
}: ComparePropertyButtonProps) {
  const [selected, setSelected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    syncSelected();

    window.addEventListener(
      "compare-properties-changed",
      syncSelected
    );

    return () => {
      window.removeEventListener(
        "compare-properties-changed",
        syncSelected
      );
    };
  }, [propertyId]);

  const syncSelected = () => {
    const ids = getCompareProperties();
    setSelected(ids.includes(propertyId));
  };

  const toggleCompare = () => {
    const ids = getCompareProperties();

    if (ids.includes(propertyId)) {
      const updated = ids.filter(
        (id) => id !== propertyId
      );

      saveCompareProperties(updated);
      return;
    }

    if (ids.length >= MAX_COMPARE) {
      window.alert(
        "You can compare up to 4 properties at a time."
      );
      return;
    }

    saveCompareProperties([...ids, propertyId]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleCompare}
      aria-pressed={selected}
      className={`${className} ${
        selected
          ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
          : ""
      }`}
    >
      {selected ? "✓ Added to Compare" : "Compare"}
    </button>
  );
}

export function getCompareProperties(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(COMPARE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id): id is string => typeof id === "string"
    );
  } catch {
    return [];
  }
}

function saveCompareProperties(ids: string[]) {
  localStorage.setItem(
    COMPARE_KEY,
    JSON.stringify(ids)
  );

  window.dispatchEvent(
    new Event("compare-properties-changed")
  );
}

