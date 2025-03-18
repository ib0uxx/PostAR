import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Sign up</h1>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm password" />
      <Button text="Sign up" />
      <p>Do you have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'white' }}>Sign in</span></p>
    </div>
  );
};

export default Signup;
