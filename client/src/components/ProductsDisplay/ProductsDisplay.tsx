import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductDisplay.module.css";
import { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchCategoryById,
  
} from "../../services/Api";
import CategoriesDisplay from "../CategoriesDisplay/CategoriesDisplay";

const ProductsDisplay = ({
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = selectedCategoryId
        ? await fetchCategoryById(selectedCategoryId)
        : await fetchAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategoryId]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className={styles.productDisplayContainer}>
      <CategoriesDisplay
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
     
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </section>
  );
};

export default ProductsDisplay;
