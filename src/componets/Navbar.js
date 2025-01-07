import React, { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(44, 19, 11, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(30, 12, 5, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 2px solid #8B4513;

  &.scrolled {
    padding: 0.8rem 2rem;
    background: rgba(44, 19, 11, 0.98);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/coffee-beans-pattern.png') repeat;
    opacity: 0.05;
    pointer-events: none;
  }
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  
  a {
    color: #D2691E;
    text-decoration: none;
    background: linear-gradient(to right, #D2691E, #CD853F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    
    &:hover {
      opacity: 0.9;
    }
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  position: relative;
  
  a {
    color: #DEB887;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    
    &:hover {
      color: #FFE4B5;
    }
  }
  &.active a {
    text-decoration: underline;
    color: #D2691E;
  }

  &::after {
    content: '☕';
    position: absolute;
    font-size: 0.8rem;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.3s ease;
    color: #D2691E;
  }

  &:hover::after {
    transform: translateX(-50%) scale(1);
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: 2px solid #D2691E;
  font-size: 1.8rem;
  cursor: pointer;
  color: #DEB887;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: rgba(210, 105, 30, 0.2);
    color: #FFE4B5;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: rgba(44, 19, 11, 0.98);
  padding: 1rem;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 15px 15px;
  border: 2px solid #8b4513;
  border-top: none;
`;

const MobileNavLink = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  
  a {
    color: #DEB887;
    text-decoration: none;
    font-weight: 500;
    display: block;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
  }

  &:hover {
    background: rgba(210, 105, 30, 0.2);
    
    a {
      color: #FFE4B5;
      transform: translateX(10px);
    }
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavbarContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={scrolled ? 'scrolled' : ''}
      >
        <Logo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">MsCafe</Link>
        </Logo>
        <NavLinks>
          <NavLink className={location.pathname === '/' ? 'active' : ''}
          whileHover={{ scale: 1.05 }}>
            <Link to="/">Home</Link>
          </NavLink>
          <NavLink className={location.pathname === '/shop' ? 'active' : ''}
          whileHover={{ scale: 1.05 }}>
            <Link to="/shop">Shop</Link>
          </NavLink>
          <NavLink className={location.pathname === '/about' ? 'active' : ''} 
          whileHover={{ scale: 1.05 }}>
            <Link to="/about">About</Link>
          </NavLink>
          <NavLink className={location.pathname === '/testimonial' ? 'active' : ''}
          whileHover={{ scale: 1.05 }}>
            <Link to="/testimonial">Testimonial</Link>
          </NavLink>
          <NavLink className={location.pathname === '/contact' ? 'active' : ''}
          whileHover={{ scale: 1.05 }}>
            <Link to="/contact">Contact</Link>
          </NavLink>
          
          {isLoggedIn ? (
            <>
              <NavLink className={location.pathname === '/profile' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}>
                <Link to="/profile">Profile</Link>
              </NavLink>
              <NavLink 
              whileHover={{ scale: 1.05 }}>
                <Link to="/cart">Cart</Link>
              </NavLink>
              <NavLink className={location.pathname === '/cart' ? 'active' : ''}
                whileHover={{ scale: 1.05 }} 
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink className={location.pathname === '/login' ? 'active' : ''}
            whileHover={{ scale: 1.05 }}>
              <Link to="/login">Login</Link>
            </NavLink>
          )}
        </NavLinks>
        <MobileMenuButton
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? '×' : '☰'}
        </MobileMenuButton>
      </NavbarContainer>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/shop" onClick={toggleMenu}>Shop</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/testimonial" onClick={toggleMenu}>Testimonial</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/premiumbeans" onClick={toggleMenu}>Premium Beans</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.02 }}>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </MobileNavLink>
            {isLoggedIn ? (
              <>
                <MobileNavLink whileHover={{ scale: 1.02 }}>
                  <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                </MobileNavLink>
                <MobileNavLink whileHover={{ scale: 1.02 }}>
                  <Link to="/cart" onClick={toggleMenu}>Cart</Link>
                </MobileNavLink>
                <MobileNavLink 
                  whileHover={{ scale: 1.02 }} 
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </MobileNavLink>
              </>
            ) : (
              <MobileNavLink whileHover={{ scale: 1.02 }}>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </MobileNavLink>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;