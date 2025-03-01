import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

// Estilos para la imagen del producto 
const ProductImage = styled.img`
  width: 350px; /* Tamaño un poco más grande */
  height: 350px;
  object-fit: cover;
  border-radius: 15px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto elevado */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */

  &:hover {
    transform: scale(1.05); /* Efecto de escala al hacer hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
  }
`;

// Estilos para el título del producto con un toque moderno
const ProductTitle = styled.h2`
  font-size: 1.8em; /* Tamaño de fuente más grande */
  margin: 15px 0;
  color: #333; /* Color oscuro para mejor contraste */
  text-align: center;
`;

// Estilos para el precio del producto con un color llamativo
const ProductPrice = styled.p`
  font-size: 1.4em; /* Tamaño de fuente más grande */
  color: #ff6f61; /* Color llamativo para el precio */
  margin: 15px 0;
  font-weight: bold;
`;

// Estilos para la descripción del producto
const ProductDescription = styled.p`
  font-size: 1.1em; /* Tamaño de fuente más grande */
  margin: 15px 0;
  max-width: 700px; /* Ancho máximo un poco más grande */
  text-align: center;
  color: #555; /* Color gris oscuro para mejor legibilidad */
  line-height: 1.6; /* Espaciado entre líneas para mejor lectura */
`;

// Botón para agregar al carrito con un diseño destacado
const BuyButton = styled.button`
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

// Componente ProductDetail 
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Efecto para cargar los detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {/* Imagen del producto con efecto hover */}
      <ProductImage src={product.image} alt={product.title} />
      
      {/* Título del producto */}
      <ProductTitle>{product.title}</ProductTitle>
      
      {/* Precio del producto */}
      <ProductPrice>${product.price}</ProductPrice>
      
      {/* Descripción del producto */}
      <ProductDescription>{product.description}</ProductDescription>
      
      {/* Botón para agregar al carrito */}
      <BuyButton onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 })}>
        Agregar al Carrito
      </BuyButton>
    </Container>
  );
};

export default ProductDetail;