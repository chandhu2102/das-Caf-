import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlice';

const RegisterBackGround = styled.section`
  background-image: url('https://img.freepik.com/free-photo/hot-latte-art-coffee-cup-wood-table-coffee-shop_1150-8937.jpg?t=st=1727759954~exp=1727763554~hmac=2715c972f28c255c158e0d14f664f9443fdd95a0e4b21cf6d5b41bc690aaa2d3&w=1380');
  background-size: cover;
  background-position: center;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegisterForm = styled(motion.form)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.5rem;
  background-color: #7c2214;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #7c2214;
  text-decoration: none;
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  color: green;
  text-align: center;
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
  text-align: center;
`;

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Store user credentials in local storage
        localStorage.setItem('user', JSON.stringify(formData));
        dispatch(login({ username: formData.username, email: formData.email }));
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setError('');
        setTimeout(() => {
            navigate('/profile'); // Redirect to profile page
        }, 2000);
    };

    return (
        <RegisterBackGround>
            <RegisterContainer>
                <RegisterForm
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                >
                    <h2>Register</h2>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                    >
                        Register
                    </Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {isSubmitted && <SuccessMessage>Registration successful!</SuccessMessage>}
                    <LoginLink to="/login">Already have an account? Login</LoginLink>
                </RegisterForm>
            </RegisterContainer>
        </RegisterBackGround>
    );
};

export default Register;
