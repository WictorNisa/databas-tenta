import { useActionState } from "react";
import styles from "./SignUp.module.css";
import { registerNewUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, action, isPending] = useActionState(
    (previousState, formData) =>
      saveUser(previousState, formData, navigate, login),
    undefined
  );

  return (
    <form className={styles.signUpFormContainer} action={action}>
      <label>Name</label>
      <input type="text" name={"name"} placeholder="Name" />

      <label>Email adress</label>
      <input type="email" name={"email"} placeholder="Email address" required />

      <label>Phone number</label>
      <input type="number" name={"phone"} placeholder="Phone number" />

      <label>Password</label>
      <input
        type="password"
        name={"password"}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
};

export const saveUser = async (
  previousState: unknown,
  formData: FormData,
  navigate: Function,
  login: (user: any, token: string) => void
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const userData = {
    name,
    email,
    phone,
    password,
  };

  try {
    const result = await registerNewUser(userData);
    console.log(result)
    login(
      {
        id: result.id, // Make sure to get the user ID
        username: name, // Using name as username, adjust as needed
        email: email,
      },
      result.token
    ); // Assuming the API returns a token

    navigate("/profile");
    return result;
  } catch (error) {
    return { error: error };
  }
};

export default SignUp;
