import { useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsModalOpen(false)
  }
  // console.log(products);
  return (
    <>
    <div className={styles.productCard} onClick={openModal}>
      <div className={styles.cardImgContainer}>
        <img src={product.Img} alt={product.Product_Name} />
      </div>
      <div className={styles.cardTextContainer}>
        <h5>{product.Product_Name}</h5>
        <p>$ {product.Price}</p>
      </div>
    </div>

    {isModalOpen && (
      <div className={styles.modalOverlay}>
        <ProductDetails 
          product={product} 
          onClose={closeModal} 
        />
      </div>
    )}
  </>
  );
};

export default ProductCard;
