import styles from "./ProductDetails.module.css";

const ProductDetails = ({ handleOnClick, product }) => {
  return (
    <div className={styles.detailsContainer} onClick={handleOnClick}>
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

export default ProductDetails;
