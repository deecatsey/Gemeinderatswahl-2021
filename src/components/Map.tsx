import { TileLayer, ZoomControl, GeoJSON } from "react-leaflet";

import { Parties } from "./controls/Parties";
import { useAtomValue } from "jotai";
import { partyAtom, relativeVoteAtom, showMapAtom } from "../atoms/atoms";
import { ZoomToGeoJSON } from "../components/ZoomToGeoJSON";
import type { Layer } from "leaflet";
import type { ElectionFeature, GeoJsonElectionData } from "../types/features";
import { ControlsContainer } from "./controls/ControlsContainer";
import { ShowMapControl } from "./controls/ShowMapControl";
import { RelativeVoteDisplay } from "./controls/RelativeVoteDisplay";
import {
  getCastVotesFeatureOpacity,
  getOwnVotesFeatureOpacity,
  getPartyRange,
} from "../utils/feature-opacity";

type MapProps = { geoData: GeoJsonElectionData };

export const Map = ({ geoData }: MapProps) => {
  const party = useAtomValue(partyAtom);
  const showMap = useAtomValue(showMapAtom);
  const relativeVoteDisplayType = useAtomValue(relativeVoteAtom);

  const handleFeatureClick = (feature: ElectionFeature, layer: Layer) => {
    layer.on({
      click: async () => {
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
        style={(feature) => {
          let fillOpacity;
          if (relativeVoteDisplayType === "castVotes") {
            fillOpacity = getCastVotesFeatureOpacity(
              feature as ElectionFeature,
              party.identifier,
            );
          } else {
            const range = getPartyRange(party.identifier, geoData);
            fillOpacity = getOwnVotesFeatureOpacity(
              feature as ElectionFeature,
              party.identifier,
              range,
            );
          }

          return {
            fillColor: party.color,
            fillOpacity,
            color: party.color,
            weight: 2,
          };
        }}
        onEachFeature={handleFeatureClick}
      />
      <ControlsContainer anchor={{ top: 10, left: 10 }}>
        <Parties />
      </ControlsContainer>
      <ControlsContainer anchor={{ top: 100, right: 10 }}>
        <ShowMapControl />
        <RelativeVoteDisplay />
      </ControlsContainer>
    </>
  );
};
