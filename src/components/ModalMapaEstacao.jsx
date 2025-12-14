import React, { useEffect } from 'react';
import { Modal, Button, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para ícone padrão do Leaflet que as vezes quebra em builds
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const { Text } = Typography;

// Componente auxiliar para atualizar o centro do mapa quando a estação mudar
const RecenterMap = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lon], map.getZoom());
    }, [lat, lon, map]);
    return null;
};

// Componente para corrigir renderização do mapa dentro de Modal/Tabs (Leaflet "cinza")
const FixMapSize = () => {
    const map = useMap();
    useEffect(() => {
        // Invalidate size após um breve delay para garantir que o container tenha dimensões finais
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 200);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
};

const ModalMapaEstacao = ({ visible, onClose, estacao, onEdit }) => {
    if (!estacao) return null;

    // Converter para número para garantir
    const lat = parseFloat(estacao.latitude);
    const lon = parseFloat(estacao.longitude);

    const possuiCoordenadas = !isNaN(lat) && !isNaN(lon);

    return (
        <Modal
            title={`Localização: ${estacao.nome}`}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Fechar
                </Button>
            ]}
            width={800}
            centered
        >
            {!possuiCoordenadas ? (
                <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                    <Text type="danger">Coordenadas inválidas ou não cadastradas para esta estação.</Text>
                </div>
            ) : (
                <div style={{ height: '400px', width: '100%' }}>
                    <MapContainer
                        center={[lat, lon]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lon]}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <strong>{estacao.nome}</strong><br />
                                    {estacao.cidade}, {estacao.pais}<br />
                                    <small>Lat: {lat}, Lon: {lon}</small>
                                    <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => onEdit && onEdit(estacao.id)}
                                        >
                                            Editar Estação
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                        <RecenterMap lat={lat} lon={lon} />
                        <FixMapSize />
                    </MapContainer>
                </div>
            )}
        </Modal>
    );
};

export default ModalMapaEstacao;
