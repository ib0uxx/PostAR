import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import styles from "../styles/auth.module.css";
import googleIcon from "../assets/google.png";
import appleIcon from "../assets/apple.png";
import { supabase } from "../../../backend/supabaseClient";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // This will now work because inputs have name attributes
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }

      // Vérifie si 'data' et 'data.user' existent
      if (!data?.user) {
        throw new Error("User creation failed. Please try again.");
      }

      // Vérifie les identités de l'utilisateur (s'il est déjà inscrit ou non)
      if (data.user?.identities?.length === 0) {
        throw new Error("User already registered");
      }

      // Insert the user data into the 'User' table
      try {
        const { data: userData, error: insertError } = await supabase
          .from("User")
          .insert([
            {
              auth_id: data.user.id, // Assurez-vous que 'data.user.id' existe
              username: formData.username,
              email: formData.email,
            },
          ])
          .select();

        if (insertError) throw insertError;

        console.log(userData);
      } catch (error) {
        throw new Error("Ooops, something went wrong while saving user data.");
      }

      navigate("/verify-email"); // Redirect to email verification page
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again."
      );
    }
  };
  return (
    <div className={styles["auth-container"]}>
      <div className={styles["login-box"]}>
        <h1 className={styles["title"]}>Sign up</h1>
        {error && <div className={styles["error-message"]}>{error}</div>}
        <form onSubmit={handleSignup}>
          <Input
            type="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email" // Add name attribute
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password" // Add name attribute
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword" // Add name attribute
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className={styles["buttons"]}>
            <button
              type="button"
              className={`${styles["button"]} ${styles["secondary"]}`}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              type="submit"
              className={`${styles["button"]} ${styles["primary"]}`}
            >
              Sign up →
            </button>
          </div>
        </form>
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
