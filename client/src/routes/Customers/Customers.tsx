import styles from "./Customers.module.css";
import heroImg from "../../assets/img/customers-hero.png";
import { fetchCustomerById } from "../../services/Api";
import { FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

interface Customer {
  id: string;
}

const searchCustomer = async (prevState: any, formData: FormData) => {
  const id = formData.get("personalId") as String;
  try {
    const customer = await fetchCustomerById(id);
    return { customer, error: null };
  } catch (error) {
    return { customer: null, error: "Failed to fetch customer" };
  }
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Searching..." : "Search"}
    </button>
  );
};

const Customers = () => {
  const [state, formAction] = useActionState(searchCustomer, {
    customer: null,
    error: null,
  });
  console.log(state.customer);
  return (
    <section className={styles.customersContainer}>
      <div className={styles.customersImgContainer}>
        <img src={heroImg} alt="" />
        <div className={styles.textOverlay}>
          <h1>Customer Page</h1>
          <p>
            Search after your order details and customer information via your
            personal id
          </p>
        </div>
      </div>
      <div className={styles.customerFormContainer}>
        <div className={styles.formInnerContainer}>
          <h2>Enter your id</h2>
          <form action={formAction} className={styles.form}>
            <input type="text" name="personalId" required />

            <SubmitButton />
          </form>
          <div className={styles.customerDisplay}>
            {state.error && <p className={styles.error}>{state.error}</p>}
            {state.customer && (
              <div className={styles.customerInfoContainer}>
                <h2>customer information</h2>
                <p>{state.customer.Customer_Name}</p>
                <p>{state.customer.Customer_Email}</p>
                <p>{state.customer.Customer_Phone}</p>
                <p>{state.customer.Customer_Delivery_Adress}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
