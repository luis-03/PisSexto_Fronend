import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';

function MapaComponent() {
    const [pointsWithDescriptions, setPointsWithDescriptions] = useState([]);

    useEffect(() => {
        const cargarDispositivos = async () => {
            try {
                const response = await fetch('https://computacion.unl.edu.ec/uv/api/medicionDispositivos');
                if (!response.ok) {
                    throw new Error('Error al obtener los dispositivos');
                }
                const data = await response.json();
                setPointsWithDescriptions(data.ultimasMediciones.map(dispositivo => ({
                    position: [dispositivo.latitud, dispositivo.longitud],
                    nombre: dispositivo.nombre,
                    uv: dispositivo.medicions[0].uv,
                    fecha: formatFecha(dispositivo.medicions[0].fecha)
                })));
            } catch (error) {
                console.error(error);
            }
        };

        cargarDispositivos();
    }, []);

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${año} ${horas}:${minutos}`;
    };

    return (
        <MapContainer center={[-4.033788501660946, -79.20193874829619]} zoom={14} className='mapa'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pointsWithDescriptions.map(({ position, nombre, uv, fecha }, index) => (
                <Marker key={index} position={position}>
                    <Popup>
                        <div>
                            <h4>{nombre}</h4>
                            <p>Ubicación: {position[0]}, {position[1]}</p>
                            <p>Intensidad UV: {uv}</p>
                            <p>Última medición: {fecha}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapaComponent;
