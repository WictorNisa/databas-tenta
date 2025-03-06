import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/img/hero-tech.png";

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <img
        src={HeroImg}
        alt="Image of a cyber ninja"
        className={styles.heroImg}
      />
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTextHeader}>Tech Gear</h1>
        <p className={styles.heroTextParagraph}>Shop the latest tech here!</p>
        <button>
          <Link to="/products">Products</Link>
        </button>
      </div>
    </section>
  );
};

export default Home;

// Things to do Wednesday 20 Feb

// Create a moredetails component so the user can see more details about a product when clicked
// Add component or section for the user to post, update and delete a product

//If there is time over start working on the customer page
