import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import StatsCards from './components/StatsCards';
import Notification from './components/Notification';
import './App.css';

function App() {
  // Estados para manejar la aplicación
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('cards');
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  // Cargar datos al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('inventory_app_data');
    if (savedData) {
      setInventory(JSON.parse(savedData));
    } else {
      // Datos de ejemplo si no hay nada guardado
      const sampleData = [
        { id: 1, name: 'Smartphone X', category: 'electronica', price: 599.99, quantity: 15, location: 'Zona A, Estante 2', barcode: '7222380' },
        { id: 2, name: 'Camiseta deportiva', category: 'ropa', price: 24.99, quantity: 30, location: 'Zona B, Estante 3', barcode: '7212480' },
        { id: 3, name: 'Arroz integral', category: 'alimentos', price: 3.49, quantity: 50, location: 'Zona C, Estante 1', barcode: '7213650' },
        { id: 4, name: 'Sofá de tela', category: 'hogar', price: 299.99, quantity: 5, location: 'Zona D, Estante 1', barcode: '7223460' }
      ];
      setInventory(sampleData);
      localStorage.setItem('inventory_app_data', JSON.stringify(sampleData));
    }

    // Cargar preferencias de vista y modo oscuro
    const savedView = localStorage.getItem('inventory_view_preference');
    if (savedView) setViewMode(savedView);
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Guardar en localStorage cuando cambia el inventario
  useEffect(() => {
    localStorage.setItem('inventory_app_data', JSON.stringify(inventory));
  }, [inventory]);

  // Mostrar notificación
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Funciones CRUD
  const handleAddProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setInventory([...inventory, newProduct]);
    showNotification('Producto agregado con éxito', 'success');
  };

  const handleUpdateProduct = (updatedProduct) => {
    setInventory(inventory.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showNotification('Producto actualizado', 'success');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    const productName = inventory.find(p => p.id === id)?.name || 'este producto';
    if (window.confirm(`¿Eliminar "${productName}"?`)) {
      setInventory(inventory.filter(p => p.id !== id));
      showNotification('Producto eliminado', 'warning');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    showNotification('Editando producto', 'info');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const toggleView = () => {
    const newView = viewMode === 'cards' ? 'table' : 'cards';
    setViewMode(newView);
    localStorage.setItem('inventory_view_preference', newView);
  };

  // Filtrar y ordenar productos
  const filteredProducts = inventory
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'quantity-asc': return a.quantity - b.quantity;
        case 'quantity-desc': return b.quantity - a.quantity;
        default: return 0;
      }
    });

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Container fluid className="app-container">
        <Header
          onAddProduct={() => setShowForm(true)}
          onToggleView={toggleView}
          viewMode={viewMode}
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        
        <div className="main-content">
          <StatsCards inventory={inventory} />
          
          {showForm && (
            <ProductForm
              product={editingProduct}
              onAdd={handleAddProduct}
              onUpdate={handleUpdateProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          )}
          
          <ProductList
            products={filteredProducts}
            viewMode={viewMode}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
        
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </Container>
    </div>
  );
}

export default App;