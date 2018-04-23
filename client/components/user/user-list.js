import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { getUsersFromServerThunkerator } from '../../store'
import UserItem from './user-item'

///this should only be available to admin users

export class UserList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        store.dispatch(getUsersFromServerThunkerator());
    }

    render() {
        const { userList, user: loggedInUser } = this.props;
        return (
            <div className="userList">
                {userList.map(user => <UserItem loggedInUser={loggedInUser} key={user.id} user={user} />)}
            </div>
        )
    }

}


/*-----------CONTAINER-----------*/

const mapStateToProps = ({userList, user}) => ({
    userList,
    user,
    ///need to be able to get all of the users using a fetch
}
)

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
