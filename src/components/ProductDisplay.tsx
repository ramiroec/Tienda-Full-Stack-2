import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Contenedor principal con un diseño moderno y atractivo
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f8f9fa; /* Fondo claro para un look limpio */
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
`;

// Estilos para el encabezado con un toque moderno
const Header = styled.header`
  margin-bottom: 30px; /* Más margen inferior */
  font-size: 2.5em; /* Tamaño de fuente más grande */
  color: #343a40; /* Color oscuro para mejor contraste */
  font-weight: bold; /* Texto en negrita */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Sombra de texto para destacar */
`;

// Contenedor de la lista de categorías con un diseño más organizado
const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Más espacio entre los botones */
  margin-bottom: 30px; /* Más margen inferior */
  flex-wrap: wrap; /* Permite que los botones se ajusten en pantallas pequeñas */
`;

// Estilos para los botones de categoría con efectos hover
const CategoryButton = styled.button`
  padding: 12px 20px; /* Más padding para un mejor tacto */
  border: none;
  background-color: #007bff; /* Azul vibrante */
  color: white;
  border-radius: 10px; /* Bordes más redondeados */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transición suave */
  font-size: 1em; /* Tamaño de fuente más grande */

  &:hover {
    background-color: #0056b3; /* Azul más oscuro al hacer hover */
    transform: translateY(-3px); /* Efecto de levitación */
  }
`;

// Contenedor de la lista de productos con un diseño moderno
const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 25px; /* Más espacio entre los productos */
  list-style: none;
  padding: 0;
  justify-content: center; /* Centra los productos en la pantalla */
`;

// Estilos para cada ítem de producto 
const ProductItem = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px; /* Bordes más redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto elevado */
  overflow: hidden;
  width: 220px; /* Ancho un poco más grande */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */

  &:hover {
    transform: scale(1.05); /* Efecto de escala al hacer hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
  }
`;

// Estilos para la imagen del producto con un diseño atractivo
const ProductImage = styled.img`
  width: 100%;
  height: 220px; /* Altura un poco más grande */
  object-fit: cover;
  border-bottom: 1px solid #ddd; /* Línea divisoria */
`;

// Estilos para el título del producto con un toque moderno
const ProductTitle = styled.h2`
  font-size: 1.3em; /* Tamaño de fuente más grande */
  margin: 15px 0; /* Más margen */
  padding: 0 10px;
  color: #333; /* Color oscuro para mejor contraste */
`;

// Estilos para el precio del producto con un color llamativo
const ProductPrice = styled.p`
  font-size: 1.2em; /* Tamaño de fuente más grande */
  color: #ff6f61; /* Color llamativo para el precio */
  margin: 15px 0; /* Más margen */
  font-weight: bold; /* Texto en negrita */
`;

// Componente ProductDisplay
const ProductDisplay: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar las categorías
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

  // Efecto para cargar los productos de la categoría seleccionada
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

  // Función para cambiar la categoría seleccionada
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {/* Encabezado de la página */}
      <Header>Productos</Header>

      {/* Lista de categorías */}
      <CategoryList>
        {categories.map((category) => (
          <CategoryButton key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </CategoryButton>
        ))}
      </CategoryList>

      {/* Lista de productos */}
      <ProductList>
        {products.map((product) => (
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