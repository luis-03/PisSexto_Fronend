import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Notification from './Notification';



const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    return <Navigate to='/' />;
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
        <Notification/>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: 'white' }}>Inicio</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/DatosHistoricos" style={{ color: 'white' }}>Datos Historicos</Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/peticiones" style={{ color: 'white' }}>Peticiones</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/persona" style={{ color: 'white' }}>Personas</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/solicitud" style={{ color: 'white' }}>Solicitudes</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/dispositivolista" style={{ color: 'white' }}>Ver Dispositivos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu" style={{ color: 'white' }}>Sobre el proyecto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: 'white' }}>Sesion</Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none', border: 'none', background: 'none' }}>Cerrar Sesión</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
