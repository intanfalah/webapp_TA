import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import maplibregl from 'maplibre-gl';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './WebMap.css';
import { onValue, ref } from 'firebase/database';
import { FirebaseDatabase } from '../Firebase/config';
import { Link } from 'react-router-dom';

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
  const initialZoom = 17;

  const [geoData, setGeoData] = useState(null);       // untuk line.geojson
  const [losData, setLosData] = useState({ in: "A", out: "A" });
  const [atcsPoints, setAtcsPoints] = useState([]);   // untuk ATCS.geojson titik

  useEffect(() => {
    fetch('/data/line.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Gagal load GeoJSON line:", err));
  }, []);

  useEffect(() => {
    fetch('/data/ATCS.geojson')   // asumsi file di folder public/ATCS.geojson
      .then(res => res.json())
      .then(data => {
        // Filter hanya fitur Point saja
        const points = data.features
          .filter(f => f.geometry.type === "Point")
          .map(f => ({
            id: f.properties.id || Math.random(), // buat id unik
            position: [f.geometry.coordinates[1], f.geometry.coordinates[0]], // lat,lng
            text: f.properties.text || 'ATCS Point',
          }));
        setAtcsPoints(points);
      })
      .catch(err => console.error("Gagal load ATCS.geojson:", err));
  }, []);

  // Firebase LOS listener
  useEffect(() => {
    const losRef = ref(FirebaseDatabase, 'traffic_snapshot/current_data/LOS');
    const unsubscribe = onValue(losRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLosData({
          in: data.in ?? "A",
          out: data.out ?? "A"
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const losColorMap = {
    A: "#00FF00",
    B: "#99FF00",
    C: "#FFFF00",
    D: "#FF9900",
    E: "#FF3300",
    F: "#FF0000",
    default: "#AAAAAA",
  };

  const styleByKeterangan = (feature) => {
    const keterangan = feature.properties.keterangan;
    const losValue = losData[keterangan] || "A";
    const color = losColorMap[losValue] || "#CCCCCC";
    return {
      color,
      weight: 4,
    };
  };

  return (
    <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render marker dari ATCS.geojson */}
      {atcsPoints.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.text}</Popup>
        </Marker>
      ))}

      {/* Render garis dari line.geojson */}
      {geoData && (
        <GeoJSON data={geoData} style={styleByKeterangan} />
      )}
    </MapContainer>
  );
};

function WebMap() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapType, setMapType] = useState('leaflet'); // or 'maplibre' (dimintanya dark style)

  const [sidebarData, setSidebarData] = useState([]);

useEffect(() => {
  const dataRef = ref(FirebaseDatabase, 'traffic_snapshot/current_data');

  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const waktu = new Date(data.timestamp).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const formatted = [{
        waktu: waktu,
        mc_in: data.entering?.MC ?? '-',
        mc_out: data.leaving?.MC ?? '-',
        hv_in: data.entering?.HV ?? '-',
        hv_out: data.leaving?.HV ?? '-',
        lv_in: data.entering?.LV ?? '-',
        lv_out: data.leaving?.LV ?? '-',
        ds_in: data.DS?.in ?? '-',
        ds_out: data.DS?.out ?? '-',
        los_in: data.LOS?.in ?? '-',
        los_out: data.LOS?.out ?? '-',
      }];

      setSidebarData(formatted);
    }
  });

  return () => unsubscribe();
}, []);

return (
  <div className="webmap-container">
    {/* Home */}
    <div className="home-button">
      <Link to="/" className="home-link">🏠 Home</Link>
    </div>
    
    {/* Map Layer */}
    <div className="map-layer">
      {mapType === 'leaflet' && <LeafletMap trafficData={sidebarData} />}
    </div>

    {/* Sidebar */}
    <div className="sidebar-bottom">
      <div className="sidebar-content">
        {/* ... TABEL STATISTIK ... */}
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
    
    {/* Legend */}
    <div className="map-legend">
      <h4>Level of Service</h4>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#00FF00'}}></span> A - Free flow</div>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#66FF00'}}></span> B - Reasonably free flow</div>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#FFFF00'}}></span> C - Stable flow</div>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#FFAA00'}}></span> D - Approaching unstable flow</div>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#FF5500'}}></span> E - Unstable flow</div>
      <div className="legend-item"><span className="color-box" style={{backgroundColor:'#FF0000'}}></span> F - Forced or breakdown flow</div>
    </div>
  </div>
);
}

export default WebMap;
