import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import styles from "../styles/dashboard.module.css";
import profilePic from "../assets/profile.png";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = { name: "John Doe", avatar: profilePic };
      setUser(userData);
    };
    fetchUser();
  }, []);

  const cardsData = [
    { id: 1, text: 'Main Balance', category: 'all' },
    { id: 2, text: 'Sunshine Memory', category: 'sent' },
    { id: 3, text: 'Gift Card', category: 'received' },
    { id: 4, text: 'Travel Card', category: 'sent' },
    { id: 5, text: 'Bonus Card', category: 'received' }
  ];

  const filteredCards = cardsData.filter(card => {
    const matchesCategory = filter === 'all' ? true : card.category === filter;
    const matchesSearch = card.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCardClass = (id: number) => {
    switch (id) {
      case 1: return styles.mainBalanceCard;
      case 2: return styles.sunshineCard;
      case 3: return styles.giftCard;
      case 4: return styles.travelCard;
      case 5: return styles.bonusCard;
      default: return '';
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <Navbar />

      <div className={styles.content}>
        <img src={user?.avatar} alt="Profile" className={styles.profileImage} />
        <div className={styles.textContainer}>
          <h1 className={styles.greeting}>
            Hello <br />
            <span className={styles.userName}>{user ? user.name : "User"}</span>
          </h1>
          {/* Bouton Add Card en desktop */}
          <button onClick={() => navigate("/cardAdd")} className={`${styles.addButton} ${styles.desktopOnly}`}>
            Add Card
          </button>
        </div>
      </div>

      {/* Section My Cards */}
      <div className={styles.myCardsSection}>
        {/* Barre de recherche */}
        <div className={styles.searchcontainer}>
          <input
            className={styles.searchbar}
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Bouton Add Card en mobile */}
        <button onClick={() => navigate("/cardAdd")} className={`${styles.addButton} ${styles.mobileOnly}`}>
          Add Card
        </button>

        {/* Filtres */}
        <div className={styles.buttonContainer}>
          <button className={`${styles.allbutton} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>
            All
          </button>
          <button className={`${styles.sentbutton} ${filter === 'sent' ? styles.active : ''}`} onClick={() => setFilter('sent')}>
            Sent
          </button>
          <button className={`${styles.receivedbutton} ${filter === 'received' ? styles.active : ''}`} onClick={() => setFilter('received')}>
            Received
          </button>
        </div>

        {/* Cartes */}
        <div className={styles.cardscontainer}>
          <div className={styles.cards}>
            {filteredCards.map(card => (
              <button key={card.id} className={`${styles.card} ${getCardClass(card.id)}`}>
                <p className={styles.cardtext}>{card.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.mobileNavbarWrapper} mobileNavbarOnly`}>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Dashboard;
