import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoriesDisplay.module.css";

const CategoriesDisplay = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  console.log(categories);
  return (
    <div className={styles.displayContainer}>
      <div onClick={() => setSelectedCategoryId(null)} className={styles.displayAllDiv}><h3>Show all</h3></div>
      <div className={styles.displayContainerInner}>
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
