import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "../auth.module.css";

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["input-container"]}>
      <input
        className={styles["input"]}
        type={type === "password" && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name} // Make sure to pass the name prop
      />
      {type === "password" && (
        <span
          className={styles["eye-icon"]}
          onClick={() => setShowPassword(!showPassword)}
          role="button"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
    </div>
  );
};

export default Input;
