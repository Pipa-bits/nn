import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTable, faThLarge, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddProduct, onToggleView, viewMode, onToggleDarkMode, darkMode }) => {
  return (
    <header className="d-flex justify-content-between align-items-center mb-4 py-3 border-bottom">
      <h1 className="h4 mb-0">
        <FontAwesomeIcon icon={faTable} className="me-2" />
        Gestión de Inventario
      </h1>
      <div className="d-flex gap-2">
        <Button variant="outline-secondary" onClick={onToggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="me-1" />
          {darkMode ? 'Modo claro' : 'Modo oscuro'}
        </Button>
        <Button variant="outline-secondary" onClick={onToggleView}>
          <FontAwesomeIcon icon={viewMode === 'cards' ? faTable : faThLarge} className="me-1" />
          {viewMode === 'cards' ? 'Vista de tabla' : 'Vista de tarjetas'}
        </Button>
        <Button variant="primary" onClick={onAddProduct}>
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Agregar producto
        </Button>
      </div>
    </header>
  );
};

export default Header;