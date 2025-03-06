import { useActionState } from "react";
import styles from "./SignIn.module.css";
import { signInUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, action, isPending] = useActionState(
    (previousState, formData) =>
      loginUser(previousState, formData, login, navigate),
    undefined
  );
  return (
    <form className={styles.signInFormContainer} action={action}>
      <label>Name</label>
      <input type="email" name={"email"} placeholder="Email" />

      <label>Password</label>
      <input type="password" name={"password"} placeholder="Password" />

      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
};

export const loginUser = async (
  previousState: unknown,
  formData: FormData,
  login: (user: any, token: string) => void,
  navigate: Function
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const signInData = {
    email,
    password,
  };

  try {
    const result = await signInUser(signInData);
    login(
      {
        id: result.user.id, // Make sure to get the user ID
        username: result.user.name, // Adjust based on your API response
        email: result.user.email,
      },
      result.token
    ); // Assuming the API returns a token
    console.log(result);
    navigate("/profile");
    return result;
  } catch (error) {
    return { error: error };
  }
};

export default SignIn;
