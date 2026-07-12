import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { GeoJSON } from "leaflet";

interface ZoomToGeoJSONProps {
  data: GeoJSON.GeoJsonObject;
}

export const ZoomToGeoJSON = ({ data }: ZoomToGeoJSONProps) => {
  const map = useMap();

  useEffect(() => {
    const layer: GeoJSON = L.geoJSON(data);

    if (layer.getBounds().isValid()) {
      map.fitBounds(layer.getBounds());
    }
  }, [data, map]);

  return null;
};
