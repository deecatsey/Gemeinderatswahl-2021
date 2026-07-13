import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";
import { Map } from "./components/Map";
import { mergeVotesIntoGeoJson } from "./utils/merge-votes-into-geojson";
import type { GeoJsonElectionData } from "./types/features";

export default function App() {
  const [rawGeoData, setRawGeoData] = useState<GeoJsonElectionData | null>(
    null,
  );

  useEffect(() => {
    async function loadGeoJSON() {
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/WSPR_2021.json`,
      );
      const geoJsonData = await response.json();
      const voteData = await mergeVotesIntoGeoJson(geoJsonData);
      // console.log("VOTE DATA", voteData);

      setRawGeoData(voteData);
    }

    loadGeoJSON();
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom
      className="map"
      id="app"
      zoomControl={false}
    >
      {rawGeoData && <Map geoData={rawGeoData} />}
    </MapContainer>
  );
}
