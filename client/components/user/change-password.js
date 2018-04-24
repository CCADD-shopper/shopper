import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { editPasswordThunkerator } from '../../store'
import { FormErrors } from '../checkout/form-errors'
class changePassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      correctPassword: false,
      disable: false,
      formErrors: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }
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
    let fieldValidationErrors = this.state.formErrors
    switch (name) {
      case 'currentPassword' :
        this.checkOld(name, value, fieldValidationErrors)
        break
      case 'newPassword' :
        fieldValidationErrors[name] = value.length >= 3 ? '' : 'New password must be at least 3 characters'
        break
      case 'confirmPassword' :
        value === this.state.newPassword && this.state.correctPassword ? this.setState({disable: true}) : this.setState({disable: false})
        fieldValidationErrors[name] = value === this.state.newPassword ? '' : 'Confirm Password does not match'
        break
      default:
        return ''
    }
    console.log(this.state)
    this.setState({formError: fieldValidationErrors})
  }

  checkOld = async (name, value, fieldValidationErrors) => {
    const message = await this.props.editPasswordThunkerator(this.props.user.id, {currentPassword: value})
    if (!message.correct){
      fieldValidationErrors[name] = 'Please enter Correct Password'
      this.setState({correctPassword: false})
    }
    else {
      fieldValidationErrors[name] = ''
      this.setState({correctPassword: true})
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const passwordObj = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
    }
    await this.props.editPasswordThunkerator(this.props.user.id, passwordObj)
  }

  render(){
    const {user} = this.props
    return (
      <div>
        <form>
          <div>
            <h4>Please update your password</h4>
            <label>Old Password</label>
            <input type="password" name="currentPassword" id="" value={this.state.currentPassword} onChange={this.handleChange} size="40" />
            <label>New Password</label>
            <input type="password" name="newPassword" id="" value={this.state.newPassword} onChange={this.handleChange} size="40" />
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" id="" value={this.state.confirmPassword} onChange={this.handleChange} size="40" />
          </div>
          <br />
            <div>
              {Object.keys(this.state.formErrors).map((key, i) => {
                if (this.state.formErrors[key].length > 0){
                  return (
                    <p key={i}>{this.state.formErrors[key]}</p>
                  )
                }
              })}
            </div>
          <br />
          <div>
            <button type="submit" className="ui green button" disabled={!this.state.disable} onClick={this.handleSubmit}><Link to="/home"><span>Confirm</span></Link>
            </button>
          </div>
        </form>
      </div>
  )}
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = { editPasswordThunkerator }

export default connect(mapState, mapDispatch)(changePassword)

