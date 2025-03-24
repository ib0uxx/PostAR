import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../styles/auth.module.css';

interface InputProps {
  type?: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles['input-container']}>
  <input
    className={styles['input']}
    type={type === 'password' && !showPassword ? 'password' : 'text'}
    placeholder={placeholder}
  />
  {type === 'password' && (
    <span className={styles['eye-icon']} onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
    </span>
  )}
</div>

  );
};

export default Input;
