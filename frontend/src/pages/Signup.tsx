import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/config/supabaseClient";
import Input from "../components/Input";
import styles from "../auth.module.css";
import googleIcon from "../assets/google.png";
import appleIcon from "../assets/apple.png";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Check your email for the confirmation link!");
      navigate("/login"); // Redirige l'utilisateur après inscription
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["login-box"]}>
        <h1 className={styles["title"]}>Sign up</h1>
        {error && <p className={styles["error"]}>{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={styles["buttons"]}>
          <button
            className={`${styles["button"]} ${styles["secondary"]}`}
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button
            className={`${styles["button"]} ${styles["primary"]}`}
            onClick={handleSignup}
          >
            Sign up →
          </button>
        </div>
        <div className={styles["separator"]}>
          <span className={styles["line"]}></span>
          <span className={styles["or-text"]}>or</span>
          <span className={styles["line"]}></span>
        </div>
        <div className={styles["social-login"]}>
          <button className={styles["social-button"]}>
            <img src={googleIcon} alt="Google" />
          </button>
          <button className={styles["social-button"]}>
            <img src={appleIcon} alt="Apple" />
          </button>
        </div>
        <p className={styles["register-text"]}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className={styles["link"]}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
