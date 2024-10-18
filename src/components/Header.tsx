import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5em;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>Tienda Full Stack 2</Logo>
      <Nav>
        <NavLink to="/"><FaHome /> Inicio</NavLink>
        <NavLink to="/cart"><FaShoppingCart /> Carrito</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
