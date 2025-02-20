export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8000/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/category/${id}`
    );
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Create the promise once
export const productsPromise = fetchAllProducts();


