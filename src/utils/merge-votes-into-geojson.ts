import { parse } from "csv-parse/browser/esm/sync";
import type { ElectionResultRow } from "../types/features";

interface Feature {
  properties: {
    votes: Record<string, number>;
  };
}

type MinMax = Record<string, { min: number; max: number }>;

export const mergeVotesIntoGeoJson = async (
  geojsonData: GeoJSON.FeatureCollection,
) => {
  // Load CSV
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/GR21Sprengel.csv`,
  );

  if (!response.ok) {
    throw new Error(
      `CSV load failed: ${response.status} ${response.statusText}`,
    );
  }
  const csv = await response.text();

  // Parse CSV
  const records: ElectionResultRow[] = parse(csv, {
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
    // "Wahlberechtigte",
    // "abgegebene Stimmen",
    // "gültige Stimmen",
  ];

  for (const row of records) {
    const sprengel = String(row.Wahlsprengel).padStart(3, "0");

    voteLookup[sprengel] = Object.fromEntries(
      Object.entries(row).filter(([key]) => !excluded.includes(key)),
    ) as Record<string, number>;
  }

  const voteData = geojsonData.features.map((feature: GeoJSON.Feature) => {
    const sprengel = String(feature?.properties?.WSPRID).padStart(3, "0");
    return {
      ...feature,
      properties: {
        ...feature.properties,
        votes: voteLookup[sprengel] ?? {},
      },
    };
  });

  const votesRange = voteData.reduce<MinMax>((acc, feature) => {
    for (const [key, value] of Object.entries(feature.properties.votes)) {
      if (!acc[key]) {
        acc[key] = { min: value, max: value };
      } else {
        acc[key].min = Math.min(acc[key].min, value);
        acc[key].max = Math.max(acc[key].max, value);
      }
    }
    return acc;
  }, {});

  // Merge into GeoJSON
  return {
    ...geojsonData,
    features: voteData,
    votesRange,
  };
};
