import axios from 'axios';

// const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

export const updateOrderStatusThunkerator = (orderId, statusToBe) => {
    return async () => {
        try {
            await axios.put(`/api/orders/${orderId}`, {status: statusToBe})
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
