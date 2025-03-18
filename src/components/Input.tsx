import React from 'react';
import '../styles.css';

interface InputProps {
  type?: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder }) => {
  return <input className="input" type={type} placeholder={placeholder} />;
};

export default Input;
