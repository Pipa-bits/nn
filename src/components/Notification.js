import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
      <Alert variant={type} onClose={onClose} dismissible>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;