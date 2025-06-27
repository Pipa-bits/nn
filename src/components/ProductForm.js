import { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductForm = ({ product, onAdd, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    location: '',
    barcode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        location: product.location,
        barcode: product.barcode
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        quantity: '',
        location: '',
        barcode: ''
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Mínimo 3 caracteres';
    }
    
    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Precio inválido';
    }
    
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Cantidad inválida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      id: product?.id || Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      location: formData.location.trim() || 'No especificada',
      barcode: formData.barcode.trim() || 'N/A'
    };

    if (product) {
      onUpdate(productData);
    } else {
      onAdd(productData);
    }
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Modal show={true} onHide={onCancel} size="lg">
      <Modal.Header closeButton className={product ? 'bg-warning' : ''}>
        <Modal.Title>
          <FontAwesomeIcon icon={product ? faEdit : faPlusCircle} className="me-2" />
          {product ? 'Editar producto' : 'Agregar producto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productName">
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productCategory">
                <Form.Label>Categoría*</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="electronica">Electrónica</option>
                  <option value="ropa">Ropa</option>
                  <option value="alimentos">Alimentos</option>
                  <option value="hogar">Hogar</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productPrice">
                <Form.Label>Precio (CLP)*</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productQuantity">
                <Form.Label>Cantidad*</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productLocation">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ej: Zona A, Estante 2"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productBarcode">
                <Form.Label>Código de barras</Form.Label>
                <Form.Control
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {product ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;