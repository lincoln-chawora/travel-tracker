import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import React, {useEffect, useState} from "react";
import {useCitiesContext} from "../contexts/useCitiesContext";
import {useGeolocation} from "../hooks/useGeolocation";
import Button from "./Button";
import {useUrlPosition} from "../hooks/useUrlPosition";
import styles from "./Map.module.css"


export function Map() {
    const {cities} = useCitiesContext();
    const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>
            )}

            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker key={city.id} position={[+city.position.lat, +city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

const ZOOM_POSITION = 4;

interface ChangeCenterProps {
    position: LatLngExpression;
}
const ChangeCenter: React.FC<ChangeCenterProps> = ({position}) => {
    const map = useMap();
    map.setView(position, ZOOM_POSITION);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    });

    return null;
}