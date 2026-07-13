import type { Party, PartyIdentifier } from "../consts/parties";

const normalizeValue = (value: number, min: number, max: number): number => {
  if (min === max) {
    return 0;
  }
  return (value - min) / (max - min);
};

export const getPartyRange = (party: PartyIdentifier, geoJsonData) => {
  const { votesRange } = geoJsonData;
  return votesRange[party];
};

export const getOwnVotesFeatureOpacity = (
  feature: GeoJSON.Feature,
  selectedParty: Party,
  range: { min: number; max: number },
) => {
  const votes = feature?.properties?.votes[selectedParty];
  if (!votes) return 0;
  const { min, max } = range;

  return normalizeValue(votes, min, max);
};

export const getCastVotesFeatureOpacity = (
  feature: GeoJSON.Feature,
  selectedParty: Party,
) => {
  const castVotes = feature?.properties?.votes["abgegebene Stimmen"];
  const votes = feature?.properties?.votes[selectedParty] ?? 0;
  if (!castVotes || !votes) return 0;

  return votes / castVotes;
};
