import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

export const getProductFromServer = (product) => ({
  type: GET_PRODUCT,
  product,
})

//thunk
export const getProductFromServerThunkerator = (productId) => {
  return async (dispatch) => {
    try {
      const selectedProduct = await axios.get(`/api/${productId}`);
      dispatch(getProductFromServer(selectedProduct.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_PRODUCT:
      return action.product;

    default:
      return prevState;
  }
}