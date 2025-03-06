import styles from "./Products.module.css";
import ProductsDisplay from "../../components/ProductsDisplay/ProductsDisplay";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../services/Api";
import Carousel from "../../components/Carousel/Carousel";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomProduct, setRandomProduct] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categories = Array.from(
    products
      .reduce((map, product) => {
        map.set(product.Category_id, {
          id: product.Category_id,
          name: product.Category,
        });
        return map;
      }, new Map())
      .values()
  );

  //Handle initial fetch
  useEffect(() => {
    const fetchIntialProducts = async () => {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchIntialProducts();
  }, []);

  //Handle random product selection
  useEffect(() => {
    const pickRandomProject = () => {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    };

    pickRandomProject();

    const Interval = setInterval(pickRandomProject, 10000);

    return () => clearInterval(Interval);
  }, [products]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className={styles.productsContainerWp}>
      <div className={styles.productsHeroContainer}>
        <div className={styles.heroTextContainer}>
          {randomProduct && (
            <>
              <h1>{randomProduct.Product_Name}</h1>
              <p>{randomProduct.Description}</p>
              <span>Price ${randomProduct.Price}</span>
            </>
          )}
        </div>
        <div className={styles.heroImgContainer}>
          {randomProduct && (
            <img src={randomProduct.Img} alt={randomProduct.Product_Name} />
          )}
        </div>
      </div>
      <Carousel />
      <ProductsDisplay
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
    </section>
  );
};

export default Products;
