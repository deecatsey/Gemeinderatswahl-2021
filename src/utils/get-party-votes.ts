import { getVotesForSprengel } from "./get-votes-for-sprengel";

export const getPartyVotes = async (geojson: any, party: string) => {
  const featuresWithVotes = await Promise.all(
    geojson.features.map(async (feature: any) => {
      const wahlsprengel = String(feature.properties.WSPRID).padStart(3, "0");
      const votes = await getVotesForSprengel(wahlsprengel, party);

      console.log("VOTES", votes);

      return {
        ...feature,
        properties: {
          ...feature.properties,
          votes: votes ?? 0,
        },
      };
    }),
  );

  const maxVotes = Math.max(
    ...featuresWithVotes.map((f) => f.properties.votes),
  );

  return {
    ...geojson,
    features: featuresWithVotes.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        opacity: maxVotes === 0 ? 0 : feature.properties.votes / maxVotes,
      },
    })),
  };
};
