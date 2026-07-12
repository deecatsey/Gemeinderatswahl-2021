import { parse } from "csv-parse/browser/esm/sync";

let rows: Record<string, string>[] | undefined;

async function loadElectionData() {
  if (!rows) {
    const response = await fetch("/data/GR21Sprengel.csv");

    if (!response.ok) {
      throw new Error(
        `CSV load failed: ${response.status} ${response.statusText}`,
      );
    }
    const csv = await response.text();

    rows = parse(csv, {
      columns: true,
      delimiter: ";",
      skip_empty_lines: true,
    });
  }

  return rows;
}

export async function getVotesForSprengel(
  wahlsprengel: string,
  party: string,
): Promise<number | null> {
  const data = await loadElectionData();

  // console.log("requested wahlsprengel:", JSON.stringify(wahlsprengel));
  // console.log("requested party:", JSON.stringify(party));

  // console.log("first row:", data[0]);
  // console.log(
  //   "available wahlsprengel:",
  //   data.map((r) => r["Wahlsprengel"]).slice(0, 10),
  // );

  const row = data.find((r) => r["Wahlsprengel"] === String(wahlsprengel));

  if (!row) {
    return null;
  }
  // console.log("matched row:", row);
  const votes = row[party];
  // console.log("votes:", votes);

  return votes ? Number(votes) : null;
}
