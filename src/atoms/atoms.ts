import { atom } from "jotai";
import { Parties, type Party } from "../consts/parties";

export const partyAtom = atom<Party>(Parties.LINZ);

export const showMapAtom = atom(true);
