import { parse } from "csv-parse/sync";

export const loadVotes = async () => {
  const response = await fetch("/data/GR21Sprengel.csv");
  const csv = await response.text();

  const records = parse(csv, {
    columns: true,
    delimiter: ";",
    skip_empty_lines: true,
    cast: true, // converts numbers to numbers
  });

  const lookup: Record<string, Record<string, number>> = {};

  for (const row of records) {
    const sprengel = String(row.Wahlsprengel).padStart(3, "0");

    lookup[sprengel] = {
      SPÖ: row["SPÖ"],
      FPÖ: row["FPÖ"],
      ÖVP: row["ÖVP"],
      GRÜNE: row["GRÜNE"],
      NEOS: row["NEOS"],
      KPÖ: row["KPÖ"],
      LINZ: row["LINZ"],
      VOLT: row["VOLT"],
      WANDL: row["WANDL"],
      MFG: row["MFG"],
      R: row["R"],
    };
  }

  return lookup;
};
