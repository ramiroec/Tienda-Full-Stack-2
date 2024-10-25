import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 20px;
  font-size: 2em;
  color: #343a40;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  font-size: 1.2em;
  margin: 10px 0;
  padding: 0 10px;
`;

const ProductPrice = styled.p`
  font-size: 1.1em;
  color: #b12704;
  margin: 10px 0;
`;

const ProductDisplay: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error al cargar las categorías');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header>Productos</Header>
      <CategoryList>
        {categories.map(category => (
          <CategoryButton key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </CategoryButton>
        ))}
      </CategoryList>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>${product.price}</ProductPrice>
            </Link>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default ProductDisplay;
