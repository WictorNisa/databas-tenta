const BASE_URL = `http://localhost:8000`

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8000/products`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


//Create the promise once
export const productsPromise = fetchAllProducts()


