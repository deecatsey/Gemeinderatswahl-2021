import { TileLayer, ZoomControl, GeoJSON } from "react-leaflet";

import { Parties } from "../components/Parties";
import { useAtomValue } from "jotai";
import { partyAtom, showMapAtom } from "../atoms/atoms";
import { ZoomToGeoJSON } from "../components/ZoomToGeoJSON";
import { getVotesForSprengel } from "../utils/get-votes-for-sprengel";
import type { Layer } from "leaflet";
import { Control } from "./Control";
import type { ElectionFeature } from "../types/features";

type MapProps = { geoData: GeoJSON.GeoJsonObject };

const getFeatureOpacity = (feature: GeoJSON.Feature, selectedParty: string) => {
  const castVotes = feature?.properties?.votes["abgegebene Stimmen"];
  const votes = feature?.properties?.votes[selectedParty] ?? 0;
  if (!castVotes || !votes) return 0;

  return votes / castVotes;
};

export const Map = ({ geoData }: MapProps) => {
  const party = useAtomValue(partyAtom);
  const showMap = useAtomValue(showMapAtom);

  const handleFeatureClick = (feature: ElectionFeature, layer: Layer) => {
    layer.on({
      click: async () => {
        const {
          properties: { WSPRID },
        } = feature;
        console.log("Clicked feature:", feature);
        const votes = await getVotesForSprengel(WSPRID, party.identifier);

        console.log("VOTES get votes", votes);
        if (feature.properties) {
          layer.bindPopup(
            `<pre>${JSON.stringify(feature.properties, null, 2)}</pre>`,
          );
        }
      },
    });
  };

  return (
    <>
      <ZoomControl position="topright" />
      {showMap && (
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={showMap ? 1 : 0}
        />
      )}
      <ZoomToGeoJSON data={geoData} />
      <GeoJSON
        data={geoData}
        style={(feature) => ({
          fillColor: party.color,
          fillOpacity: getFeatureOpacity(
            feature as ElectionFeature,
            party.identifier,
          ),
          color: party.color,
          weight: 2,
        })}
        onEachFeature={handleFeatureClick}
      />
      <Parties />
      <Control />
    </>
  );
};
