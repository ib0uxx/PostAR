import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import styles from '../auth.module.css';
import googleIcon from '../assets/google.png';
import appleIcon from '../assets/apple.png';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['auth-container']}>
      <div className={styles['login-box']}>
        <h1 className={styles['title']}>Sign up</h1>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <div className={styles['buttons']}>
          <button className={`${styles['button']} ${styles['secondary']}`} onClick={() => navigate('/')}>Back</button>
          <button className={`${styles['button']} ${styles['primary']}`}>Sign up →</button>
        </div>
        <div className={styles['separator']}>
          <span className={styles['line']}></span>
          <span className={styles['or-text']}>or</span>
          <span className={styles['line']}></span>
        </div>
        <div className={styles['social-login']}>
          <button className={styles['social-button']}><img src={googleIcon} alt="Google" /></button>
          <button className={styles['social-button']}><img src={appleIcon} alt="Apple" /></button>
        </div>
        <p className={styles['register-text']}>
          Already have an account? <span onClick={() => navigate('/login')} className={styles['link']}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
