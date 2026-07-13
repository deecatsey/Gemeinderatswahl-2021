import { partyAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";
import {
  Parties as PartiesConsts,
  type PartyIdentifier,
} from "../../consts/parties";

export const Parties = () => {
  const [party, setParty] = useAtom(partyAtom);

  const parties = Object.values(PartiesConsts).map((party) => (
    <option key={party.label} value={party.identifier}>
      {party.label}
    </option>
  ));

  return (
    <div>
      <label htmlFor="party">Partei: </label>
      <select
        id="party"
        value={party.identifier}
        onChange={(e) => {
          const identifier = e.target.value as PartyIdentifier;
          setParty(PartiesConsts[identifier]);
        }}
      >
        {parties}
      </select>
    </div>
  );
};
