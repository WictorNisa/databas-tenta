import styles from "./Products.module.css";
import ProductsDisplay from "../../components/ProductsDisplay/ProductsDisplay";
import { use, Suspense, useEffect, useState } from "react";
import { productsPromise } from "../../services/Api";

const Products = () => {
  const products = use(productsPromise);
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    const pickRandomProject = () => {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    };

    pickRandomProject();

    const Interval = setInterval(pickRandomProject, 10000);

    return () => clearInterval(Interval);
  }, [products]);

  return (
    <section className={styles.productsContainerWp}>
      <div className={styles.productsHeroContainer}>
        <div className={styles.heroTextContainer}>
          <Suspense fallback={<h2>Loading featured product...</h2>}>
            {randomProduct && (
              <>
                <h1>{randomProduct.Product_Name}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident dolore eaque perferendis laborum corporis aperiam
                  illum ratione quae pariatur! Architecto ratione culpa corporis
                  quas voluptatem nihil ipsa commodi quis earum!
                </p>
              </>
            )}
          </Suspense>
        </div>
        <div className={styles.heroImgContainer}>
          <Suspense fallback={<h2>Loading featured product...</h2>}>
            {randomProduct && (
              <img src={randomProduct.Img} alt={randomProduct.Product_Name} />
            )}
          </Suspense>
        </div>
      </div>

      <div className={styles.productsCategoryContainer}>
        <div className={styles.categoryContainerInner}></div>
      </div>
      <ProductsDisplay />
    </section>
  );
};

export default Products;
