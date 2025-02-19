import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className={styles.productCard}>
      <div className={styles.cardImgContainer}>
        <img src={product.Img} alt={product.Product_Name} />
      </div>
      <div className={styles.cardTextContainer}>
        <h5>{product.Product_Name}</h5>
        <p>{product.Category}</p>
        <p>{product.Manufacturer_Name}</p>
        <p>Price: ${product.Price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
