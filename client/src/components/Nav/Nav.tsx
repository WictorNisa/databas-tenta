import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../../Context/AuthContext";

const Nav = () => {
  const { user, logout } = useAuth();
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

        {/* <li className={styles.navItem}>
          <Link to="/customers">Customers</Link>
        </li> */}
      </ul>

      {user ? (
        <div className={styles.navProfileContainer}>
          <p>
            Greetings, <span>{user.username}</span>
          </p>
          <Link to="/profile">Profile</Link>
          {/* <button onClick={logout}>Logout</button> */}
        </div>
      ) : (
        <Link to="/auth">Sign up</Link>
      )}
    </nav>
  );
};

export default Nav;
