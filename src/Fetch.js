import React, {useState, useEffect} from 'react';
import axios from "axios";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const Fetch = () => {
    const [points, setPoints] = useState([])
    useEffect(() => {
        axios.get('https://geodata.gov.hk/gs/api/v1.0.0/geoDataQuery?q=%7Bv%3A%221%2E0%2E0%22%2Cid%3Abbea81e1-135b-49b1-9067-8c99f56fa985%2Clang%3A%22ENG%22%2ClongMin%3A114.2%2ClatMin%3A22.24%2ClongMax%3A114.23%2ClatMax%3A22.29%7D'
        ).then(res => {
            setPoints(res.data.features);
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <MapContainer center={[22.28, 114.22]} zoom={16} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                points.map(wifi => (
                    <Marker
                        key={wifi.properties.GMID}
                        position={[wifi.geometry.coordinates[1], wifi.geometry.coordinates[0]]}>
                        <Popup position={[wifi.geometry.coordinates[1], wifi.geometry.coordinates[0]]}>
                            <div>
                                <p>{"Address: " + wifi.properties.Address}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
};

export default Fetch;
