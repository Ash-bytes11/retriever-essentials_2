import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import ProductGrid from './Components/Grid';
import Pagination from './Components/Pages';
import BottomNav from './Components/Nav';
import FAQ from './Components/FAQ';
import Location from './Components/Location';
import CategoryPage from './Components/CategoryPage'; 
import AboutUs from './Components/AboutUs';
import ScanID from './Components/Scan';
import Checkout from './Components/Checkout';
import ProductDetails from './Components/ProductDetails';
import AddItem from './Components/AddItem'; 
import SearchResults from './Components/SearchResults';
import EditProduct from './Components/EditProduct';
import './App.css';

function App() {
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  useEffect(() => {
    axios.get('http://localhost:8080/api/item')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };
  

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };  

  function ProductGridWithPagination({ products }) {
    const location = useLocation();
    const showPagination = location.pathname === '/product-grid';

    return (
      <div>
        <ProductGrid products={products} addToCart={addToCart} />
        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header cart={cart} />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<ScanID />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/location" element={<Location />} />
              <Route path="/:category" element={<CategoryPage addToCart={addToCart} />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path='/checkout' element={<Checkout cart={cart} clearCart={clearCart} />} />
              <Route path="/product-grid" element={<ProductGridWithPagination products={products} />} />
              <Route path="/product/:name" element={<ProductDetails addToCart={addToCart} />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/search/:searchTerm" element={<SearchResults addToCart={addToCart} />} />
              <Route path="/edit-product/:name" element={<EditProduct />} />
            </Routes>
          </div>
        </div>

        <div
          className="bottom-nav"
          style={{
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            padding: '20px 0',
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Link to="/about-us" style={{ color: 'white', margin: '0 15px' }}>About Us</Link>
          <Link to="/location" style={{ color: 'white', margin: '0 15px' }}>Location</Link>
          <Link to="/faq" style={{ color: 'white', margin: '0 15px' }}>FAQ</Link>
          <Link to="/add-item">Add New Item</Link>
        </div>

        <div
          style={{
            backgroundImage: 'url(/images/umbc.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '90px',
          }}
        ></div>
      </div>
    </Router>
  );
}

export default App;







