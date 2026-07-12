import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";
import { Map } from "./components/Map";
import { mergeVotesIntoGeoJson } from "./utils/merge-votes-into-geojson";

const GEOJSON_URL =
  "https://gist.githubusercontent.com/deecatsey/b48f846370c055ea7e80cbd2ade48999/raw/ddab00862911bb3de57954f00540531b2f39b896/gistfile1.txt";

export default function App() {
  const [rawGeoData, setRawGeoData] = useState<GeoJSON.GeoJsonObject | null>(
    null,
  );

  useEffect(() => {
    async function loadGeoJSON() {
      const response = await fetch(GEOJSON_URL);
      const data = await response.json();
      const voteData = await mergeVotesIntoGeoJson(data);
      console.log("VOTE DATA", voteData);

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
