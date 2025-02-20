import { useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const [modal, setModal] = useState(false);

  const handleOnClick = () => {
    setModal((prev) => !prev);
  };
  // console.log(products);
  return modal ? (
    <ProductDetails handleOnClick={handleOnClick} product={product}/>
  ) : (
    <div className={styles.productCard} onClick={handleOnClick}>
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
