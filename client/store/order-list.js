import axios from 'axios';

const GET_ORDERS_FROM_SERVER = 'GET_ORDERS_FROM_SERVER';
const GET_UPDATED_ORDER_FROM_SERVER = 'GET_UPDATED_ORDER_FROM_SERVER';

export const getOrdersFromServer = (orders) => ({
  type: GET_ORDERS_FROM_SERVER,
  orders,
})

export const getUpdatedOrderFromServer = (order) => ({
  type: GET_UPDATED_ORDER_FROM_SERVER,
  order,
})

//thunks
export const getOrdersFromServerThunkerator = (userId) => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(`/api/orders/user/${userId}`);
      dispatch(getOrdersFromServer(orders.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const updateOrderStatusThunkerator = (orderId, statusToBe) => {
  return async (dispatch) => {
      try {
        const updatedOrder = await axios.put(`/api/orders/${orderId}`, {status: statusToBe})
        dispatch(getUpdatedOrderFromServer(updatedOrder))
      }
      catch (err) {
          console.log(err)
      }
  }
}

export const createOrderDetailThunkerator = (orderId, details) => {
  return () => {
      try {
          console.log('working?')
          details.orderId = orderId;
          axios.post('/api/orders/fillOrderDetails', details)
      }
      catch (err) {
          console.log(err)
      }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_ORDERS_FROM_SERVER:
      return action.orders;

    case GET_UPDATED_ORDER_FROM_SERVER:
      return prevState.map(order => {
        if (order.id === action.order.id) return action.order
        else return order
      })

    default: return prevState;
  }
}
