export const relativeVoteDisplayTypes = ["castVotes", "ownVotes"] as const;

export type RelativeVoteDisplayType = (typeof relativeVoteDisplayTypes)[number];

export type MinMax = Record<string, { min: number; max: number }>;
