import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import HeroImg from '../../assets/img/hero-tech.png'


const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <img src={HeroImg} alt="Image of a cyber ninja" className={styles.heroImg}/>
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTextHeader}>Cyber Tech</h1>
        <p className={styles.heroTextParagraph}>Shop the latest tech here!</p>
        {/* <button>
          <Link to="/products">View products</Link>
        </button> */}
      </div>
    </section>
  );
};

export default Home;

// Things to do Wednesday 19 Feb

// Finish the Hero Page
// Start fetching a product by ID
// Start searching for a product by name
