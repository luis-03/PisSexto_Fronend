import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/style.css';
import MapaComponent from './Mapa/Mapa'; // Cambié el nombre de la importación para que coincida con el MapaComponent actualizado

function ListarDispositivos() {
    const [dispositivos, setDispositivos] = useState([]);

    useEffect(() => {
        const cargarDispositivos = async () => {
            try {
                const response = await fetch('https://computacion.unl.edu.ec/uv/api/medicionDispositivos'); // URL actualizada del endpoint de la API
                if (!response.ok) {
                    throw new Error('Error al obtener los dispositivos');
                }
                const data = await response.json();
                setDispositivos(data.ultimasMediciones); // Actualizando la estructura de los dispositivos
            } catch (error) {
                console.error(error);
            }
        };

        cargarDispositivos();
    }, []);

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>DISPOSITIVOS</h1>
            
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <table className="table table-sm table-bordered text-center">
                        <thead className="table-active">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Latitud</th>
                                <th scope="col">Longitud</th>
                                <th scope="col">Intensidad UV</th>
                                <th scope="col">Última medición</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispositivos.map((dispositivo, index) => (
                                <tr key={index}>
                                    <td>{dispositivo.nombre}</td>
                                    <td>{dispositivo.latitud}</td>
                                    <td>{dispositivo.longitud}</td>
                                    <td>{dispositivo.medicions[0].uv.toFixed(2)}</td>
                                    <td>{formatFecha(dispositivo.medicions[0].fecha)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container-fluid d-flex justify-content-center align-items-center h-100'>
                <div className='col-8 d-flex flex-column h-100'>
                    <MapaComponent dispositivos={dispositivos} /> {/* Pasando los dispositivos al componente del mapa */}
                </div>
            </div>
        </div>
    );
}

const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
};

export default ListarDispositivos;
