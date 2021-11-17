import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from "react";
export const Map = withGoogleMap(
  (props: { markers: { lat: number; lng: number; icon?: string }[] }) => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={
          props.markers.length > 0
            ? props.markers[0]
            : { lat: -34.476333045552764, lng: -58.75965727273095 }
        }
      >
        {props.markers.map((marker) => (
          <Marker
            key={marker.lat.toString() + marker.lng.toString()}
            position={marker}
          />
        ))}
      </GoogleMap>
    );
  }
);
