import styles from "./ProductDetails.module.css";

interface ProductInterfaceProps {
  product: {
    Img: string;
    Product_Name: string;
    Category: string;
    Price: number;
    Description?: string;
  };
  onClose: (e?: React.MouseEvent) => void;
}

const ProductDetails: React.FC<ProductInterfaceProps> = ({
  product,
  onClose,
}) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCart = () => {
    console.log("Adding to cart", product);
  };
  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.detailsContainer} onClick={handleContainerClick}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.cardImgContainer}>
          <img src={product.Img} alt={product.Product_Name} />
        </div>

        <div className={styles.cardTextContainer}>
          <h2>{product.Product_Name}</h2>
          <p>
            <strong>Category:</strong> {product.Category}
          </p>
          <p>
            <strong>Manufacturer:</strong> {product.Manufacturer_Name}
          </p>
          <p>
            <strong>Price:</strong> ${product.Price}
          </p>

          {/* Optional description */}
          {product.Description && (
            <p className={styles.description}>{product.Description}</p>
          )}

          <div className={styles.actions}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
