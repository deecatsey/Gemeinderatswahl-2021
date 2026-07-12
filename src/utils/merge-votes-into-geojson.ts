import { parse } from "csv-parse/browser/esm/sync";

export const mergeVotesIntoGeoJson = async (geojson: any) => {
  // Load CSV
  const response = await fetch("/data/GR21Sprengel.csv");

  if (!response.ok) {
    throw new Error(
      `CSV load failed: ${response.status} ${response.statusText}`,
    );
  }
  const csv = await response.text();

  // Parse CSV
  const records = parse(csv, {
    columns: true,
    delimiter: ";",
    skip_empty_lines: true,
    cast: true,
  });

  // Build lookup table
  const voteLookup: Record<string, Record<string, number>> = {};

  const excluded = [
    "Wahl",
    "Wahlsprengel",
    "Wahlberechtigte",
    // "abgegebene Stimmen",
    // "gültige Stimmen",
  ];

  for (const row of records) {
    const sprengel = String(row.Wahlsprengel).padStart(3, "0");

    voteLookup[sprengel] = Object.fromEntries(
      Object.entries(row).filter(([key]) => !excluded.includes(key)),
    ) as Record<string, number>;
  }

  // Merge into GeoJSON
  return {
    ...geojson,
    features: geojson.features.map((feature: any) => {
      const sprengel = String(feature.properties.WSPRID).padStart(3, "0");

      return {
        ...feature,
        properties: {
          ...feature.properties,
          votes: voteLookup[sprengel] ?? {},
        },
      };
    }),
  };
};
