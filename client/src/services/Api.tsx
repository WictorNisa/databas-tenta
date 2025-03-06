interface userData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface signInData {
  email: string;
  password: string;
}

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8000/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/category/${id}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCustomerById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8000/customers/${id}`);
    const data = await response.json();
    console.log(data);
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.log(error);
  }
};

export const registerNewUser = async (userData: userData) => {
  try {
    const response = await fetch(`http://localhost:8000/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInUser = async (signInData: signInData) => {
  try {
    const response = await fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signInData),
    });

    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

//Create the promise once
export const productsPromise = fetchAllProducts();
