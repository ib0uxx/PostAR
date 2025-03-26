import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import styles from "../styles/cardEdit.module.css";

// im adding a bit of commentairy so its easier to see what does what.
// i have almost no experience with backend and databases so change what you need to change
// chatgpt has been used for parts of the backend of this page

const CardEdit: React.FC = () => {
  const { id } = useParams(); // get card id from URL
  const navigate = useNavigate();

  const [card, setCard] = useState({
    title: "",
    date: "",
    message: "",
    imageUrl: "",
  });

  const [initialCard, setInitialCard] = useState({
    title: "",
    date: "",
    message: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/cards/${id}`)
      .then((response) => {
        setCard(response.data); // update the state with fetched card data
        setInitialCard(response.data); // store the initial data to reset later
      })
      .catch((error) => {
        console.error("Error fetching card:", error);
      });
  }, [id]);

  // this function updates the state when the user types in an input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  // resets form to the initially fetched data
  const handleReset = () => {
    setCard(initialCard);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/cards/${id}`, card);
      alert("Card updated successfully!");
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`http://localhost:5000/cards/${id}`);
        alert("Card deleted!");
        navigate("/");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.titlePreview}>
        <h1>{card.title || "Card Title"}</h1>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.preview}>
          {card.imageUrl ? (
            <img src={card.imageUrl} className={styles.exampleImage} alt="Card Example" />
          ) : (
            <h2 className="noUrl">No image available</h2>
          )}
        </div>
        <div className={styles.form}>
          <h2>Card Title</h2>
          <input type="text" name="title" className={styles.inputField} value={card.title} onChange={handleInputChange} />
          <h2>Sent on</h2>
          <input type="date" name="date" className={styles.dateField} value={card.date} onChange={handleInputChange} />
          <h2>Message</h2>
          <input type="text" name="message" className={styles.inputField} value={card.message} onChange={handleInputChange} />
        </div>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.cancelButton} onClick={handleDelete}>DELETE CARD</button>
        <button className={styles.cancelButton} onClick={() => navigate("/dashboard")}>Cancel</button>
        <button className={styles.submitButton} onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

export default CardEdit;
