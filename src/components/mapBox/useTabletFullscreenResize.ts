import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
// resize needed for tablets
export default function useTabletFullscreenResize(mapRef: mapboxgl.Map | null) {
  useEffect(() => {
    const resize = () => {
      mapRef?.resize();
    };
    document.addEventListener("fullscreenchange", resize);
    document.addEventListener("webkitfullscreenchange", resize);
    document.addEventListener("mozfullscreenchange", resize);
    document.addEventListener("msfullscreenchange", resize);
    return () => {
      document.removeEventListener("fullscreenchange", resize);
      document.removeEventListener("webkitfullscreenchange", resize);
      document.removeEventListener("mozfullscreenchange", resize);
      document.removeEventListener("msfullscreenchange", resize);
    };
  }, [mapRef]);
}
