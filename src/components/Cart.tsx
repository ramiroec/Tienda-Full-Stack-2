import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 60px; /* Ajuste para el header fijo */
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h2`
  font-size: 1.2em;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 1.1em;
  color: #b12704;
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #cc0000;
  }
`;

const CheckoutButton = styled.button`
  background-color: #ff9900;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #e68a00;
  }
`;

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Compra simulada realizada con éxito!');
    clearCart();
  };

  return (
    <Container>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map(item => (
          <CartItem key={item.id}>
            <ItemDetails>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>${item.price} x {item.quantity}</ItemPrice>
            </ItemDetails>
            <RemoveButton onClick={() => removeFromCart(item.id)}>Eliminar</RemoveButton>
          </CartItem>
        ))
      )}
      {cart.length > 0 && <CheckoutButton onClick={handleCheckout}>Realizar Compra</CheckoutButton>}
    </Container>
  );
};

export default Cart;
