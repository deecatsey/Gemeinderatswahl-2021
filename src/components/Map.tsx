import { TileLayer, ZoomControl, GeoJSON, Popup } from "react-leaflet";

import { Parties } from "./controls/Parties";
import { useAtomValue } from "jotai";
import { partyAtom, relativeVoteAtom, showMapAtom } from "../atoms/atoms";
import { ZoomToGeoJSON } from "../components/ZoomToGeoJSON";
import { featureGroup, type Layer } from "leaflet";
import type { ElectionFeature, GeoJsonElectionData } from "../types/features";
import { ControlsContainer } from "./controls/ControlsContainer";
import { ShowMapControl } from "./controls/ShowMapControl";
import { RelativeVoteDisplay } from "./controls/RelativeVoteDisplay";
import {
  getCastVotesFeatureOpacity,
  getOwnVotesFeatureOpacity,
} from "../utils/feature-opacity";
import { useState } from "react";
import { VotesChart } from "./chart/VotesChart";

type MapProps = { geoData: GeoJsonElectionData };

export const Map = ({ geoData }: MapProps) => {
  const party = useAtomValue(partyAtom);
  const showMap = useAtomValue(showMapAtom);
  const [selectedFeature, setSelectedFeature] =
    useState<ElectionFeature | null>(null);
  const relativeVoteDisplayType = useAtomValue(relativeVoteAtom);

  console.log("GEOJSON", geoData);

  const handleFeatureClick = (feature, layer) => {
    layer.on({
      click: (e) => {
        setSelectedFeature({
          feature,
          position: e.latlng,
        });
      },
    });
  };

  // const handleFeatureClick = (feature: ElectionFeature, layer: Layer) => {
  //   layer.on({
  //     click: async () => {
  //       if (feature.properties) {
  //         // layer.bindPopup(
  //         //   `<pre>${JSON.stringify(feature.properties, null, 2)}</pre>`,
  //         // );
  //         console.log(feature.properties, "DATA");
  //         const {
  //           properties: { votes },
  //         } = feature;
  //         layer.bindPopup(`<VotesChart data={votes}/>`);
  //       }
  //     },
  //   });
  // };

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
          if (relativeVoteDisplayType === "alle") {
            fillOpacity = getCastVotesFeatureOpacity(
              feature as ElectionFeature,
              party.identifier,
            );
          } else {
            fillOpacity = getOwnVotesFeatureOpacity(
              feature as ElectionFeature,
              party.identifier,
              geoData,
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
        {/* <BackgroundColorPicker /> */}
      </ControlsContainer>
      {selectedFeature && (
        <Popup
          minWidth={300} // TODO: adjust
          position={selectedFeature.position}
          eventHandlers={{
            remove: () => setSelectedFeature(null),
          }}
        >
          <VotesChart feature={selectedFeature} />
        </Popup>
      )}
    </>
  );
};
