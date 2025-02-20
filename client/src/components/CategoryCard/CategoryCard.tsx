import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category, setSelectedCategoryId }) => {
  return (
    <div
      onClick={() => setSelectedCategoryId(category.id)}
      className={styles.cardContainer}
    >
      <h1>{category.name}</h1>
    </div>
  );
};

export default CategoryCard;
