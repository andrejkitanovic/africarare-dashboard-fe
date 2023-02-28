import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { MutableRefObject } from "react";

export const mapEnv = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: process.env.REACT_APP_MAPBOX_STYLE,
};

export const mapInitialConfig = {
  style: mapEnv.style,
  lat: 44,
  lng: 21,
  zoom: 6,
  pitch: 0,
};

export const setSourceFeatureState = (
  map: MutableRefObject<mapboxgl.Map | null>,
  sourceId: string,
  featureState: { [key: string]: any }
) =>
  // @ts-ignore
  map.current!.getSource(sourceId)?._data.features.forEach((feature) => {
    map.current!.setFeatureState(
      { source: sourceId, id: feature.properties.id },
      featureState
    );
  });

export const changeCursorOnLayerHover = (
  map: MutableRefObject<mapboxgl.Map | null>,
  layerId: string
) => {
  // change the cursor to a pointer when the mouse is over the places layer.
  map.current?.on("mouseenter", layerId, function () {
    map.current!.getCanvas().style.cursor = "pointer";
  });

  // change it back to a pointer when it leaves.
  map.current?.on("mouseleave", layerId, function () {
    map.current!.getCanvas().style.cursor = "";
  });
};

// zoom map to fit all sources in view
export function fitBounds(
  sourceIds: string[],
  map: mapboxgl.Map,
  options: mapboxgl.FitBoundsOptions = { maxZoom: 10 }
) {
  const bounds = sourceIds.reduce((acc, curr) => {
    const geoJSON = map.getSource(curr) as GeoJSONSource;
    // @ts-ignore
    return geoJSON!._data.features.reduce((bounds, feature) => {
      if (!Array.isArray(feature.geometry.coordinates[0])) {
        return bounds.extend(feature.geometry.coordinates);
      } else {
        // @ts-ignore
        return feature.geometry.coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, bounds);
      }
    }, acc);
  }, new mapboxgl.LngLatBounds());

  if (bounds.isEmpty()) return;

  const padding = document.fullscreenElement
    ? { top: 150, bottom: 100, left: 250, right: 250 }
    : { top: 50, bottom: 50, left: 50, right: 50 };

  map.fitBounds(bounds, {
    padding: padding,
    ...options,
  });
}
