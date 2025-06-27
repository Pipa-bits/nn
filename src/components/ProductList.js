import { Card, Table, Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxes } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({
  products,
  viewMode,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  sortOption,
  onSortChange
}) => {
  const getCategoryName = (key) => {
    const categories = {
      'electronica': 'Electrónica',
      'ropa': 'Ropa',
      'alimentos': 'Alimentos',
      'hogar': 'Hogar'
    };
    return categories[key] || key;
  };

  return (
    <div className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="alimentos">Alimentos</option>
            <option value="hogar">Hogar</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
            <option value="quantity-asc">Cantidad (Menor a Mayor)</option>
            <option value="quantity-desc">Cantidad (Mayor a Menor)</option>
          </Form.Select>
        </Col>
      </Row>

      {viewMode === 'cards' ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="col">
                <Card className="h-100">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">{product.name}</Card.Title>
                    <span className="badge bg-secondary">
                      {getCategoryName(product.category)}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-2">
                      <small className="text-muted">Precio:</small>
                      <div className="fw-bold text-primary">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Cantidad:</small>
                      <div>{product.quantity}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Ubicación:</small>
                      <div>{product.location}</div>
                    </div>
                    <div>
                      <small className="text-muted">Código:</small>
                      <div>{product.barcode}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="me-1" />
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                      Eliminar
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <FontAwesomeIcon icon={faBoxes} size="3x" className="text-muted mb-3" />
              <h5>No hay productos</h5>
              <p>Intenta con otros criterios de búsqueda</p>
            </div>
          )}
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{getCategoryName(product.category)}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.location}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => onEdit(product)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <FontAwesomeIcon icon={faBoxes} size="2x" className="text-muted mb-2" />
                  <p className="mb-0">No hay productos</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductList;