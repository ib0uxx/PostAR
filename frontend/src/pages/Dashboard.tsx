import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import styles from "../styles/dashboard.module.css";
import profilePic from "../assets/profile.png";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = { name: "John Doe", avatar: profilePic };
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      <Navbar />
      <div className={styles.content}>
        <img src={user?.avatar} alt="Profile" className={styles.profileImage} />
        <div className={styles.textContainer}>
          <h1 className={styles.greeting}>Hello, <br></br> <span className={styles.userName}>{user ? user.name : "User"}</span></h1>
          <button onClick={() => navigate("/cardAdd")} className={styles.addButton}>
            Add Card
          </button>
        </div>
      </div>
      <div className={`${styles.mobileNavbarWrapper} mobileNavbarOnly`}>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Dashboard;
