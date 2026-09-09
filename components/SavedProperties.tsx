"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "realty-riches-saved-properties";

type SavePropertyButtonProps = {
  propertyId: string;
  className?: string;
  showLabel?: boolean;
};

export default function SavePropertyButton({
  propertyId,
  className = "",
  showLabel = true,
}: SavePropertyButtonProps) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedProperties = getSavedProperties();

    setSaved(savedProperties.includes(propertyId));
  }, [propertyId]);

  const toggleSaved = () => {
    const savedProperties = getSavedProperties();

    let updatedProperties: string[];

    if (savedProperties.includes(propertyId)) {
      updatedProperties = savedProperties.filter(
        (id) => id !== propertyId
      );

      setSaved(false);
    } else {
      updatedProperties = [
        ...savedProperties,
        propertyId,
      ];

      setSaved(true);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProperties)
    );

    window.dispatchEvent(
      new Event("saved-properties-changed")
    );
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Save property"
        className={className}
      >
        <span className="text-lg">♡</span>

        {showLabel && (
          <span className="ml-2">Save</span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      aria-label={
        saved
          ? "Remove property from saved"
          : "Save property"
      }
      aria-pressed={saved}
      className={`${className} ${
        saved
          ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
          : ""
      }`}
    >
      <span className="text-lg leading-none">
        {saved ? "♥" : "♡"}
      </span>

      {showLabel && (
        <span className="ml-2">
          {saved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}

export function getSavedProperties(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

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

