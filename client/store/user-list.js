import axios from 'axios';

const GET_USERS_FROM_SERVER = 'GET_USERS_FROM_SERVER';
const UPDATE_USER = 'UPDATE_USER';

export const getUsersFromServer = (users) => ({
  type: GET_USERS_FROM_SERVER,
  users,
})

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user
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

    case UPDATE_USER:
      return prevState.map(user => {
        if (user.id === action.user.id) return action.user
        else return user
      })

    default: return prevState;
  }
}
