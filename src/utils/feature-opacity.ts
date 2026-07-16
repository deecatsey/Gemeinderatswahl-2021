import { Parties, type PartyIdentifier } from "../consts/parties";
import type { GeoJsonElectionData } from "../types/features";

const normalizeValue = (value: number, min: number, max: number): number => {
  if (min === max) {
    return 0;
  }
  return (value - min) / (max - min);
};

export const getPartyRange = (
  party: PartyIdentifier,
  geoJsonData: GeoJsonElectionData,
) => {
  if (party === Parties.NICHT.identifier) {
    const { votesRange } = geoJsonData;
    const eligibleRange = votesRange["Wahlberechtigte"];
    const validRange = votesRange["gültige Stimmen"];

    return {
      min: eligibleRange.min - validRange.min,
      max: eligibleRange.max - validRange.max,
    };
  }

  const { votesRange } = geoJsonData;
  return votesRange[party];
};

const getNoneVoterVotes = (feature: GeoJSON.Feature) => {
  const eligibleVotes = feature?.properties?.votes["Wahlberechtigte"] ?? 0;
  const validVotes = feature?.properties?.votes["gültige Stimmen"] ?? 0;
  console.log("NON VOTERS", eligibleVotes - validVotes);
  return eligibleVotes - validVotes;
};

const getSelectedPartyVotes = (
  feature: GeoJSON.Feature,
  selectedParty: PartyIdentifier,
) => {
  return selectedParty === Parties.NICHT.identifier
    ? getNoneVoterVotes(feature)
    : (feature?.properties?.votes[selectedParty] ?? 0);
};

export const getOwnVotesFeatureOpacity = (
  feature: GeoJSON.Feature,
  selectedParty: PartyIdentifier,
  geoData: GeoJsonElectionData,
) => {
  const range = getPartyRange(selectedParty, geoData);

  const votes = getSelectedPartyVotes(feature, selectedParty);
  if (!votes) return 0;
  const { min, max } = range;
  console.log("range", range);

  return normalizeValue(votes, min, max);
};

export const getCastVotesFeatureOpacity = (
  feature: GeoJSON.Feature,
  selectedParty: PartyIdentifier,
) => {
  const castVotes = feature?.properties?.votes["gültige Stimmen"];
  const votes = getSelectedPartyVotes(feature, selectedParty);
  if (!castVotes || !votes) return 0;

  return votes / castVotes;
};
