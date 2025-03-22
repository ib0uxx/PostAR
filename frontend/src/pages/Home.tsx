import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles.css';
import clockIcon from '../assets/clock.png';


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src={clockIcon} alt="Clock Icon" className="clock-icon" />
      <h1>Post AR</h1>
      <p>Direct, simple, engaging. <strong>Send memories, not just cards.</strong></p>
      <Button text="Create Account →" onClick={() => navigate('/signup')} />
      <div className="separator"></div>

      <Button text="I have an account →" type="secondary" onClick={() => navigate('/login')} />
    </div>
  );
};

export default Home;
