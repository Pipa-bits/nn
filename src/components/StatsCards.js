import { Card } from 'react-bootstrap';

const StatsCards = ({ inventory }) => {
  const totalProducts = inventory.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = inventory.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2);
  const totalCategories = [...new Set(inventory.map(p => p.category))].length;

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="display-6">{totalProducts}</Card.Title>
            <Card.Text className="text-muted">Productos totales</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="display-6">${totalValue}</Card.Title>
            <Card.Text className="text-muted">Valor total</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="display-6">{totalCategories}</Card.Title>
            <Card.Text className="text-muted">Categorías</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StatsCards;