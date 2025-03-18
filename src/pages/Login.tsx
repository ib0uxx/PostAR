import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import styles from '../auth.module.css';  
import googleIcon from '../assets/google.png';
import appleIcon from '../assets/apple.png';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['auth-container']}> 
      <div className={styles['login-box']}>
        <h1 className={styles['title']}>Log in</h1>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <p className={styles['forgot-password']}>Did you forget your password? <a href="#">Click here</a></p>
        <div className={styles['buttons']}>
          <button className={`${styles['button']} ${styles['secondary']}`} onClick={() => navigate('/')}>Back</button>
          <button className={`${styles['button']} ${styles['primary']}`}>Log in →</button>
        </div>
        <span className={styles['or-text']}>or</span>
        <div className={styles['social-login']}>
          <button className={styles['social-button']}><img src={googleIcon} alt="Google" /></button>
          <button className={styles['social-button']}><img src={appleIcon} alt="Apple" /></button>
        </div>
        <p className={styles['register-text']}>Not a member? <a href="/signup">Register now</a></p>
      </div>
    </div>
  );
};

export default Login;
