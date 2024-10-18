import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDisplay from './components/ProductDisplay';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <main style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
