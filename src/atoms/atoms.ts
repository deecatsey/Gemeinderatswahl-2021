import { atom } from "jotai";
import { Parties } from "../consts/parties";

export const partyAtom = atom(Parties.LINZ);

export const showMapAtom = atom(true);
