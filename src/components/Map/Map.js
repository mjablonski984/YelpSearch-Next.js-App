import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
    
    const [centerCoords, setCenterCoords] = useState({
        lat: props.center ? props.center.lat : props.points[0].lat,
        lng: props.center ? props.center.lng : props.points[0].lng,
    });
    
    const markerSize = 30;

    // Center map on marker coords
    function CenterMap() {
        if(props.centerOnMarker && props.centerOnMarker[0] && props.centerOnMarker[1]) {
            const map = useMap();
            try {               
                map.invalidateSize(true);
                map.flyTo(props.centerOnMarker, map.getMaxZoom());
            } catch (e) {
                //  center map - when marker coords are not set (on new search request)
                map.flyTo(centerCoords, map.getZoom());
            }            
        }
        return null;
      }
      
    
    return (
        <MapContainer 
            center={[centerCoords.lat,  centerCoords.lng]}
            zoom={props.zoom || 15}
            scrollWheelZoom={false} 
            style={{height: "100%", width: "100%"}}
            // bounds={}
        >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
            <FeatureGroup>
            {props.points.map( (point,index) => (
                <Marker
                    key={index}
                    position={[point.lat, point.lng]}
                    animate={true} 
                    icon={L.divIcon({
                        iconSize: [markerSize, markerSize],
                        iconAnchor: [markerSize / 2, markerSize],
                        className: "mymarker",
                        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#d32323">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>`,
                        // iconUrl: '',
                    })}
                    >
                    <Popup>
                        {point.name}
                    </Popup>
                </Marker> 
            ))}
            </FeatureGroup>
            <CenterMap/> 
        </MapContainer>
    )
}


Map.propTypes = {
  points: PropTypes.array.isRequired,
  center: PropTypes.object,
  zoom: PropTypes.number,
};

export default Map