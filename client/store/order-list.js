import axios from 'axios';

const GET_ORDERS_FROM_SERVER = 'GET_ORDERS_FROM_SERVER';

export const getOrdersFromServer = (orders) => ({
  type: GET_ORDERS_FROM_SERVER,
  orders,
})

//thunks
export const getOrdersFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const allOrders = await axios.get('/api/orders');
      dispatch(getOrdersFromServer(allOrders.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_ORDERS_FROM_SERVER:
      return action.orders;

    default: return prevState;
  }
}
