import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

export const getProductFromServer = (product) => ({
  type: GET_PRODUCT,
  product,
})
export const clearProduct = () => ({
  type: CLEAR_PRODUCT
})

//thunk
export const getProductFromServerThunkerator = (productId) => {
  return async (dispatch) => {
    try {
      const selectedProduct = await axios.get(`/api/products/${productId}`);
      dispatch(getProductFromServer(selectedProduct.data));

    } catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = {}, action) => {
  switch (action.type) {

    case GET_PRODUCT:
      return action.product;

    case CLEAR_PRODUCT:
      return {};

    default:
      return prevState;
  }
}
