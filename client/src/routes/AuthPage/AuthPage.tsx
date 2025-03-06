import { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./AuthPage.module.css";
import SignIn from "../../components/SignIn/SignIn";
const AuthPage = () => {
  const [authForm, setAuthForm] = useState(true);

  const handleFormDisplay = () => {
    setAuthForm((prevstate) => !prevstate);
  };

  return (
    <section className={styles.authPageContainer}>
      <div className={styles.imageWhiteSpaceContainer}>
        <div className={styles.imageContainer}>
          {/* <h1>{authForm? 'Sign up' : 'Sign In'}</h1> */}
          <p>
            {authForm ? "Already have an account? " : "Register a new account"}
          </p>
          <p onClick={handleFormDisplay}>{authForm ? "sign in" : "Sign up"}</p>
        </div>
      </div>

      <div className={styles.formContainer}>
        {authForm? <SignUp/> : <SignIn/>} 
      </div>
    </section>
  );
};

export default AuthPage;
