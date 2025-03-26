import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import styles from "../styles/auth.module.css";
import googleIcon from "../assets/google.png";
import appleIcon from "../assets/apple.png";
import { supabase } from "../../../backend/supabaseClient"; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);

    if (error) {
      setError(error.message);
      return
    }

    if (data.user) {
      const userId = data.user.id;
      console.log(userId);
      const { data: userInfo, error: userError } = await supabase
        .from("User")
        .select("*")
        .eq("auth_id", userId)
        .maybeSingle();

      if (userError) {
        console.error("Impossible to get the profil : ", userError.message);
        setError("Can't get the profil.");
              }

              console.log("Données récupérées de User:", userInfo, "Erreur:", userError);
      localStorage.setItem("user", JSON.stringify(userInfo));

      navigate("/dashboard");
    }
  };



  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) setError(error.message);
  };


  const handleAppleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
    });

    if (error) setError(error.message);
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["login-box"]}>
        <h1 className={styles["title"]}>Log in</h1>

        {error && <div className={styles["error-message"]}>{error}</div>}

        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className={styles["forgot-password"]}>
            Did you forget your password?{" "}
            <a href="/reset-password">Click here</a>
          </p>

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
              Log in →
            </button>
          </div>
        </form>

        <div className={styles["separator"]}>
          <span className={styles["line"]}></span>
          <span className={styles["or-text"]}>or</span>
          <span className={styles["line"]}></span>
        </div>

        <div className={styles["social-login"]}>
          <button
            className={styles["social-button"]}
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="Google" />
          </button>
          <button
            className={styles["social-button"]}
            onClick={handleAppleLogin}
          >
            <img src={appleIcon} alt="Apple" />
          </button>
        </div>

        <p className={styles["register-text"]}>
          Not a member? <a href="/signup">Register now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;