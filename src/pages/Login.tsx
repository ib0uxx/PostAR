import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Log in</h1>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <p>Did you forgot your password? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'white' }}>Click here</span></p>
      <Button text="Log in" />
      <p>Not a member? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'white' }}>Register now</span></p>
    </div>
  );
};

export default Login;
