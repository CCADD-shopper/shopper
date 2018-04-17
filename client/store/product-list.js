import axios from 'axios';

const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER';

export const getProductsFromServer = (products) => ({
  type: GET_PRODUCTS_FROM_SERVER,
  products,
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

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_PRODUCTS_FROM_SERVER:
      return action.products;

    default: return prevState;
  }
}
