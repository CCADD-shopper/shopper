import axios from 'axios';

const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER';
const ADD_PRODUCT_FROM_SERVER = 'ADD_PRODUCT_FROM_SERVER';

export const getProductsFromServer = (products) => ({
  type: GET_PRODUCTS_FROM_SERVER,
  products,
})

export const addProductFromServer = (product) => ({
  type: ADD_PRODUCT_FROM_SERVER,
  product,
})

//thunks
export const getProductsFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const allProducts = await axios.get('/api/products');
      dispatch(getProductsFromServer(allProducts.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const addProductFromServerThunkerator = (product) => {
  return async (dispatch) => {
    try {
      const newProduct = await axios.post('/api/products', product);
      dispatch(addProductFromServer(newProduct.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_PRODUCTS_FROM_SERVER:
      return action.products

    case ADD_PRODUCT_FROM_SERVER:
      return [...prevState, action.product]

    default: return prevState;
  }
}
