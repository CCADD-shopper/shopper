import axios from 'axios';

const GET_USERS_FROM_SERVER = 'GET_USERS_FROM_SERVER';
const UPDATE_USER_FROM_SERVER = 'UPDATE_USER_FROM_SERVER';
const REMOVE_USER_FROM_SERVER = 'REMOVE_USER_FROM_SERVER';

export const getUsersFromServer = (users) => ({
  type: GET_USERS_FROM_SERVER,
  users,
})

export const updateUserFromServer = (user) => ({
  type: UPDATE_USER_FROM_SERVER,
  user
})

export const removeUserFromServer = (id) => ({
  type: REMOVE_USER_FROM_SERVER,
  id
})

//thunks
export const getUsersFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get('/api/users');
      dispatch(getUsersFromServer(allUsers.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_USERS_FROM_SERVER:
      return action.users;

    case REMOVE_USER_FROM_SERVER:
      return prevState.filter(user => {
        return user.id !== action.id
      })

    case UPDATE_USER_FROM_SERVER:
      return prevState.map(user => {
        if (user.id === action.user.id) return action.user
        else return user
      })

    default: return prevState;
  }
}
