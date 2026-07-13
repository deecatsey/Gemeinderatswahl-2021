import { atom } from "jotai";
import { Parties, type Party } from "../consts/parties";
import type { RelativeVoteDisplayType } from "../types/controls";

export const partyAtom = atom<Party>(Parties.LINZ);

export const showMapAtom = atom(true);

export const relativeVoteAtom = atom<RelativeVoteDisplayType>("castVotes");
