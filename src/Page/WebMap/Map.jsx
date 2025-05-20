import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import maplibregl from 'maplibre-gl';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './WebMap.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = () => {
  const initialCenter = [-7.0610, 110.4136];
  const initialZoom = 13;

  const markersData = [
    { id: 1, position: [-7.0610319210434955, 110.4136417797885], text: 'Marker 1' }
  ];

  return (
    <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersData.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const MapLibreMap = () => {
  const MAP_SERVICE_KEY = import.meta.env.VITE_MAP_SERVICE_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://basemap.mapid.io/styles/dark/style.json?key=67fdf64140b1f534c18a2269${MAP_SERVICE_KEY}`,
      center: [110.4233, -7.0399],
      zoom: 13.5,
      pitch: 60,
    });

    return () => map.current?.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

function WebMap() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapType, setMapType] = useState('leaflet'); // or 'maplibre'

  const sidebarData = [
    { waktu: '08.00-09.00', mc_in: '-', mc_out: '-', hv_in: '-', hv_out: '-', lv_in: '-', lv_out: '-', ds_in: '-', ds_out: '-', los_in: '-', los_out: '-' },
    { waktu: '09.00-10.00', mc_in: '-', mc_out: '-', hv_in: '-', hv_out: '-', lv_in: '-', lv_out: '-', ds_in: '-', ds_out: '-', los_in: '-', los_out: '-' },
    { waktu: '10.00-11.00', mc_in: '-', mc_out: '-', hv_in: '-', hv_out: '-', lv_in: '-', lv_out: '-', ds_in: '-', ds_out: '-', los_in: '-', los_out: '-' },
    { waktu: '11.00-12.00', mc_in: '-', mc_out: '-', hv_in: '-', hv_out: '-', lv_in: '-', lv_out: '-', ds_in: '-', ds_out: '-', los_in: '-', los_out: '-' },
    { waktu: '12.00-13.00', mc_in: '-', mc_out: '-', hv_in: '-', hv_out: '-', lv_in: '-', lv_out: '-', ds_in: '-', ds_out: '-', los_in: '-', los_out: '-' },
  ];

  return (
    <div className="webmap-container">
      {/* Map Layer */}
      <div className="map-layer">
        {mapType === 'leaflet' ? <LeafletMap /> : <MapLibreMap />}
      </div>

      {/* Switcher */}
      <div className="basemap-toggle">
        <button onClick={() => setMapType('leaflet')} className={mapType === 'leaflet' ? 'active' : ''}>Leaflet</button>
        <button onClick={() => setMapType('maplibre')} className={mapType === 'maplibre' ? 'active' : ''}>MapLibre</button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar-bottom ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? 'Tutup' : 'Buka'}
        </div>
        <div className="sidebar-content">
          <h2>Simpang Exit Tol Srondol</h2>
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>MC IN</th>
                <th>MC OUT</th>
                <th>HV IN</th>
                <th>HV OUT</th>
                <th>LV IN</th>
                <th>LV OUT</th>
                <th>DS IN</th>
                <th>DS OUT</th>
                <th>LoS IN</th>
                <th>LoS OUT</th>
              </tr>
            </thead>
            <tbody>
              {sidebarData.map((data, index) => (
                <tr key={index}>
                  <td>{data.waktu}</td>
                  <td>{data.mc_in}</td>
                  <td>{data.mc_out}</td>
                  <td>{data.hv_in}</td>
                  <td>{data.hv_out}</td>
                  <td>{data.lv_in}</td>
                  <td>{data.lv_out}</td>
                  <td>{data.ds_in}</td>
                  <td>{data.ds_out}</td>
                  <td>{data.los_in}</td>
                  <td>{data.los_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WebMap;
