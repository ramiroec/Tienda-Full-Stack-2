import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

// Contenedor principal 
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-top: 80px; /* Ajuste para el header fijo */
  background-color: #f9f9f9; /* Fondo claro para un look limpio */
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
`;

// Estilos para cada ítem del carrito 
const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 700px; /* Ancho máximo un poco más grande */
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto elevado */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

  &:hover {
    transform: translateY(-3px); /* Efecto de levitación al hacer hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
  }
`;

// Contenedor de detalles del ítem 
const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* Espacio entre el título y el precio */
`;

// Estilos para el título del ítem 
const ItemTitle = styled.h2`
  font-size: 1.3em;
  margin: 0;
  color: #333; /* Color oscuro para mejor contraste */
`;

// Estilos para el precio del ítem
const ItemPrice = styled.p`
  font-size: 1.1em;
  color: #ff6f61; /* Color llamativo para el precio */
  margin: 0;
  font-weight: bold;
`;

// Botón para eliminar un ítem 
const RemoveButton = styled.button`
  background-color: #ff4d4d; /* Rojo más vibrante */
  color: white;
  border: none;
  padding: 8px 15px; /* Más padding para un mejor tacto */
  font-size: 0.9em;
  cursor: pointer;
  border-radius: 8px; /* Bordes más redondeados */
  transition: background-color 0.3s ease; /* Transición suave */

  &:hover {
    background-color: #ff1a1a; /* Rojo más oscuro al hacer hover */
  }
`;

// Botón para realizar la compra 
const CheckoutButton = styled.button`
  background-color: #28a745; /* Verde para indicar acción positiva */
  color: white;
  border: none;
  padding: 12px 25px; /* Más padding para un botón más grande */
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 10px; /* Bordes más redondeados */
  margin-top: 30px; /* Más margen superior */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transición suave */

  &:hover {
    background-color: #218838; /* Verde más oscuro al hacer hover */
    transform: scale(1.05); /* Efecto de escala al hacer hover */
  }
`;

// Componente Cart
const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Función para simular la compra
  const handleCheckout = () => {
    alert('¡Compra simulada realizada con éxito!');
    clearCart();
  };

  return (
    <Container>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map((item) => (
          <CartItem key={item.id}>
            <ItemDetails>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>${item.price} x {item.quantity}</ItemPrice>
            </ItemDetails>
            <RemoveButton onClick={() => removeFromCart(item.id)}>Eliminar</RemoveButton>
          </CartItem>
        ))
      )}
      {cart.length > 0 && (
        <CheckoutButton onClick={handleCheckout}>Realizar Compra</CheckoutButton>
      )}
    </Container>
  );
};

export default Cart;