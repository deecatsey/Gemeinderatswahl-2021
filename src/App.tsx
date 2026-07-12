import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";
import { Map } from "./components/Map";
import { mergeVotesIntoGeoJson } from "./utils/merge-votes-into-geojson";

export default function App() {
  const [rawGeoData, setRawGeoData] = useState<GeoJSON.GeoJsonObject | null>(
    null,
  );

  useEffect(() => {
    async function loadGeoJSON() {
      const response = await fetch("/data/WSPR_2021.json");
      const data = await response.json();
      const voteData = await mergeVotesIntoGeoJson(data);
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
