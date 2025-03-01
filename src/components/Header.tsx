import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

// Contenedor del encabezado con estilos mejorados
const HeaderContainer = styled.header`
  background-color: #1a1a1a; // Fondo más oscuro para un look moderno
  color: white;
  padding: 15px 30px; // Más padding para un aspecto más espacioso
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Sombra para un efecto elevado
`;

// Estilos para el logo con un toque más llamativo
const Logo = styled.h1`
  font-size: 1.8em; // Tamaño de fuente más grande
  margin: 0;
  font-weight: bold;
  color: #ff6f61; // Color llamativo para el logo
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); // Sombra de texto para destacar
`;

// Contenedor de la navegación con estilos mejorados
const Nav = styled.nav`
  display: flex;
  gap: 25px; // Más espacio entre los enlaces
`;

// Estilos para los enlaces de navegación con efectos hover más vistosos
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px; // Más espacio entre el icono y el texto
  font-size: 1.1em; // Tamaño de fuente más grande
  transition: color 0.3s ease, transform 0.3s ease; // Transición suave

  &:hover {
    color: #ff6f61; // Cambio de color al hacer hover
    transform: translateY(-2px); // Efecto de levitación
    text-decoration: none; // Eliminamos el subrayado para un look más limpio
  }
`;

// Componente Header con comentarios explicativos
const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/* Logo de la tienda */}
      <Logo>Tienda Full Stack 2</Logo>
      
      {/* Navegación con enlaces a las diferentes secciones */}
      <Nav>
        <NavLink to="/">
          <FaHome /> Inicio {/* Icono de inicio */}
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart /> Carrito {/* Icono de carrito */}
        </NavLink>
        <NavLink to="/">
          <FaInfoCircle /> Acerca de {/* Icono de información */}
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;