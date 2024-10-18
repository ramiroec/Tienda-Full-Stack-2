import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 60px; /* Ajuste para el header fijo */
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  color: #b12704;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 1em;
  margin: 10px 0;
  max-width: 600px;
  text-align: center;
`;

const BuyButton = styled.button`
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
      <BuyButton onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 })}>
        Agregar al Carrito
      </BuyButton>
    </Container>
  );
};

export default ProductDetail;
