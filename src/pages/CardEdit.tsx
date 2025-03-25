import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/cardEdit.module.css";


const CardEdit: React.FC = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.navbar}>
            <Navbar />
        </div>
        <div className={styles.titlePreview}>
                <h1>Card Title</h1>
            </div>
      <div className={styles.cardContainer}>
        <div className={styles.preview}>
          <img src="src/assets/BlueCardExample.png" className={styles.exampleImage}alt="Card Example" />
        </div>
        <div className={styles.form}>
          <h2>Card Title</h2>
          <input type="text" className={styles.inputField} />
          <h2>Sent on</h2>
          <input type="date" className={styles.dateField}/>
          <h2>Message</h2>
          <input type="text" className={styles.inputField} />
        </div>

      </div>
      <div className={styles.cardButtons}>
            <button className={styles.cancelButton}>DELETE CARD</button>
            <button className={styles.cancelButton}>Cancel</button>
          </div>
    </div>
  );
};

export default CardEdit;
