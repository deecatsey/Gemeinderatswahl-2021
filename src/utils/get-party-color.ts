import { Parties, type PartyIdentifier } from "../consts/parties";

export const getColor = (partyIdentifier: PartyIdentifier) =>
  Parties[partyIdentifier].color;
