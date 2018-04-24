import React, { Component } from 'react';
import { connect } from 'react-redux';

class changePassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => { this.validate(name, value) })
  }

  validate = (name, value) => {
    switch (name) {
      case 'oldPassword' :
        if (!this.props.user.correctPassword(value)) return 'Incorrect Password'
        else if (this.props.user.correctPassword(value)) return 'Correct Password'
        else return ''
      default:
    }
  }

  render(){
    const {user} = this.props
    console.log('f', user)
    return (
      <div>
        <form>
          <h4>Please update your password</h4>
          <label>Old Password</label>
          <input type="text" name="oldPassword" id="" value={this.state.oldPassword} onChange={this.handleChange} size="40" />
          <label>New Password</label>
          <input type="text" name="newPassword" id="" value={this.state.newPassword} onChange={this.handleChange} size="40" />
          <label>Confirm Password</label>
          <input type="text" name="confirmPassword" id="" value={this.state.confirmPassword} onChange={this.handleChange} size="40" />
        </form>
      </div>
  )}
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(changePassword)

