import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { getUsersFromServerThunkerator } from '../../store'

export class UserList extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        store.dispatch(getUsersFromServerThunkerator());
    }

    render() {
        console.log('heh', this.state)
        return (
            <div>
                <div> And Follow Me </div>
                <ul>
                    {/* {this.props.user.users.map(user => {
                            return <li key={user.id}> user.email </li>
                        })} */}
                </ul>
            </div>
        )
    }

}


/*-----------CONTAINER-----------*/

const mapStateToProps = (state) => ({
    allUsers: state.userList
    ///need to be able to get all of the users using a fetch
}
)

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
