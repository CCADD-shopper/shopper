import axios from 'axios';

const GET_USERS_FROM_SERVER = 'GET_USERS_FROM_SERVER';

export const getUsersFromServer = (users) => ({
  type: GET_USERS_FROM_SERVER,
  users,
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

    default: return prevState;
  }
}
