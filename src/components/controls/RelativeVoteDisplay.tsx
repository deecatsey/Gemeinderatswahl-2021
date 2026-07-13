import { relativeVoteAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";
import {
  relativeVoteDisplayTypes,
  type RelativeVoteDisplayType,
} from "../../types/controls";

export const RelativeVoteDisplay = () => {
  const [relativeVotesDisplay, setRelativeVotesDisplay] =
    useAtom(relativeVoteAtom);

  const inputs = relativeVoteDisplayTypes.map((voteDisplayType) => (
    <div key={voteDisplayType}>
      <input
        type="radio"
        id={voteDisplayType}
        name={voteDisplayType}
        value={voteDisplayType}
        onChange={(e) => {
          const value = e.target.value as RelativeVoteDisplayType;
          setRelativeVotesDisplay(value);
        }}
        checked={voteDisplayType === relativeVotesDisplay}
      />
      <label>{voteDisplayType}</label>
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 0,
      }}
    >
      <label>Proportional to</label>
      <div style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
        {inputs}
      </div>
    </div>
  );
};
