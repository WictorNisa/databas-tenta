import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <h1>TG</h1>
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/products">Products</Link>
        </li>
        <li className={styles.navItem}>Analytics</li>
        <li className={styles.navItem}>Customers</li>
      </ul>
    </nav>
  );
};

export default Nav;
