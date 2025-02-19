import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductDisplay.module.css";
import { use, Suspense } from "react";
import { productsPromise } from "../../services/Api";

const ProductsDisplay = () => {
  const products = use(productsPromise)
  return (
    <section className={styles.productDisplayContainer}>
      <Suspense fallback={<h2>Loading...</h2>}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
      </Suspense>
    </section>
  );
};

export default ProductsDisplay;
