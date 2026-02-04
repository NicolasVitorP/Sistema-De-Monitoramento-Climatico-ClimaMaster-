import React, { useEffect } from 'react';
import { Modal, Button, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Explicitly set default icon paths to avoid webpack/vite issues
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const { Text } = Typography;

// Custom Marker Icon SVG String (Simple Flat Red Pin - No Shadow)
const customIconHtml = `
<div style="color: #F44336; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
</div>`;

const customIcon = L.divIcon({
    html: customIconHtml,
    className: 'custom-map-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
});

// Component to handle map invalidation and centering
const MapController = ({ center }) => {
    const map = useMap();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
            if (center) {
                map.setView(center, 13, { animate: false }); // Instant set, no flyTo delay
            }
        }, 100); // Super fast init
        return () => clearTimeout(timer);
    }, [map, center]);

    return null;
};

const ModalMapaEstacao = ({ visible, onClose, estacao, onEdit }) => {
    if (!estacao) return null;

    const lat = parseFloat(estacao.latitude);
    const lon = parseFloat(estacao.longitude);
    const isValid = !isNaN(lat) && !isNaN(lon);
    
    const mapKey = `map-${estacao.id}-${visible}`;

    return (
        <Modal
            title={<span style={{ fontWeight: 600 }}>Localização: {estacao.nome}</span>}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            destroyOnClose={true}
            styles={{ body: { padding: 0, height: '450px', borderRadius: '0 0 16px 16px', overflow: 'hidden' } }}
            className="map-modal"
        >
            {!isValid ? (
                <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: '#f8fafd'
                }}>
                    <Text type="secondary">Coordenadas inválidas.</Text>
                </div>
            ) : (
                <div style={{ height: '100%', width: '100%', position: 'relative' }}> 
                    <MapContainer
                        key={mapKey}
                        center={[lat, lon]}
                        zoom={13}
                        // Changed background to #f8f8f8 to match the CartoDB Light tiles (land color)
                        // This makes the "loading" delay much less noticeable than the blue water color
                        style={{ height: '100%', width: '100%', background: '#f8f8f8' }}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        {/* CartoDB Positron */}
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            // Critical optimizations for smoother zooming:
                            keepBuffer={6} // Keep a healthy buffer but not excessive
                            updateWhenZooming={true} // Update tiles DURING zoom causing less "blank" time
                            updateWhenIdle={false} // Don't wait for idle to update
                            minZoom={4} // Prevent zooming out to world view where loading is heaviest
                        />
                        <Marker position={[lat, lon]} icon={customIcon}>
                            <Popup closeButton={false} className="custom-popup">
                                <div style={{ textAlign: 'center', padding: '8px' }}>
                                    <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{estacao.nome}</div>
                                    <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        {estacao.cidade}, {estacao.pais}
                                    </div>
                                    {onEdit && (
                                        <div style={{ marginTop: 8 }}>
                                            <Button 
                                                type="primary" 
                                                size="small" 
                                                shape="round"
                                                onClick={() => { onClose(); onEdit(estacao.id); }}
                                            >
                                                Editar Detalhes
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                        <MapController center={[lat, lon]} />
                    </MapContainer>
                </div>
            )}
        </Modal>
    );
};

export default ModalMapaEstacao;
