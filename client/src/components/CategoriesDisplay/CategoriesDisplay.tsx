import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoriesDisplay.module.css";

const CategoriesDisplay = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {

  

  return (
    <div className={styles.displayContainer}>
      <h1 className={styles.displayContainerHeader}>Categories</h1>
      <form>
        <input type="text" placeholder="Search by name" />
        <button type="submit">Search</button>
      </form>
      <div className={styles.displayContainerInner}>
        <div
          onClick={() => setSelectedCategoryId(null)}
          className={styles.displayAllDiv}
        >
          <h3>Show all</h3>
        </div>
        {categories.map((category) => (
          <CategoryCard
            category={category}
            setSelectedCategoryId={setSelectedCategoryId}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesDisplay;
