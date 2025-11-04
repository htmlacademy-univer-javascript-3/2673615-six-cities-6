import { useEffect, useRef } from 'react';
import { City } from '../../types/offer';
import { Point, Points } from '../../types/map';
import useMap from '../../hooks/use-map';
import { currentCustomIcon, defaultCustomIcon } from '../../const';
import {layerGroup, Marker} from 'leaflet';


type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
};


function Map({city, points, selectedPoint} : MapProps) {
  const mapRef = useRef(null);
  const markersRef = useRef<Marker[]>([]);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      markersRef.current = points.map((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker.addTo(markerLayer);
        return marker;
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);


  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker, index) => {
        const point = points[index];
        if (point) {
          marker.setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          );
        }
      });
    }
  }, [map, points, selectedPoint]);


  return (
    <div style={{height: '100%'}} ref={mapRef}></div>
  );
}

export default Map;
