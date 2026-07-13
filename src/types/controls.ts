export const relativeVoteDisplayTypes = ["castVotes", "ownVotes"] as const;

export type RelativeVoteDisplayType = (typeof relativeVoteDisplayTypes)[number];
