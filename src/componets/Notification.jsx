import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import { Toast } from 'react-bootstrap'; // Importar el componente de Toast de Bootstrap

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUVData = async () => {
      try {
        const response = await fetch('https://apiuv.azurewebsites.net/api/disp');
        const data = await response.json();
        const latestUV = parseFloat(data.info[data.info.length - 1].uv);

        if (!isNaN(latestUV) && latestUV >= 7) {
          addNotification(`El valor de UV es ${latestUV.toFixed(2)}. ¡Protégete del sol!`);
        }
      } catch (error) {
        console.error('Error fetching UV data:', error);
      }
    };

    const interval = setInterval(fetchUVData, (300*1000));

    return () => clearInterval(interval);
  }, []);

  const addNotification = (message) => {
    const newNotification = { message, id: Date.now() };
    setNotifications([...notifications, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999'
      }}
    >
      {notifications.map(notification => (
        <Toast key={notification.id} onClose={() => removeNotification(notification.id)}>
          <Toast.Header closeButton>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default Notification;
