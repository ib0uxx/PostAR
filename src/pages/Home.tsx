import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="wave-bottom-left"></div>
      <div className="wave-top-right"></div>
      <div className="circle-top-left"></div>
      <div className="circle-bottom-left"></div>
      <div className="circle-bottom-right"></div>
      <div className="circle-left-offscreen"></div>
      <div className="circle-right-offscreen"></div>
      <div className="container">
        <h1>Post AR</h1>
        <p>Direct, simple, engaging. <strong>Send memories, not just cards.</strong></p>
        <Button text="Create Account →" onClick={() => navigate('/signup')} />
        <div className="separator"></div>
        <Button text="I have an account →" type="secondary" onClick={() => navigate('/login')} />
      </div>
    </>
  );
};

export default Home;
