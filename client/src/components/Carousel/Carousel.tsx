import styles from "./Carousel.module.css";
import { motion } from "framer-motion";
import { useRef } from "react";

const messages = [
  "All orders are shipped from our new European warehouse! Taxes and duties included!",
  "Now shipping directly from Europe – no hidden fees, no surprises!",
  "Your order, delivered faster. Shipped from our European warehouse with all taxes and duties covered.",
  "No surprises at checkout! We now ship from Europe – taxes and duties included!",
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const duplicatedMessages = [...messages, ...messages]; // Duplicate for infinite effect

  return (
    <div className={styles.carouselContainer} ref={carouselRef}>
      <motion.div
        className={styles.carouselTrack}
        animate={{ x: ["0%", "-100%"] }} // Move from 0% to -100%
        transition={{
          ease: "linear",
          duration: 80,
          repeat: Infinity,
        }}
      >
        {duplicatedMessages.map((text, index) => (
          <div key={index} className={styles.carouselItem}>
            <p>{text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
