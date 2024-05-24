import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 3})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form">
        <img
          src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1703999381/Rectangle_1467_sgtzoo.png"
          alt="website login"
          className="loginWebsiteLogo"
        />

        <form className="form-container" onSubmit={this.onSubmitUserDetails}>
          <img
            src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704001373/Group_7732_fknwex.png"
            alt="login website logo"
            className="website-logo-login"
          />
          <div className="user-details">
            <label htmlFor="username" className="username-label">
              Username*
            </label>
            <input
              id="username"
              type="text"
              className="username-input"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="user-details">
            <label htmlFor="password" className="username-label">
              Password*
            </label>
            <input
              id="password"
              type="password"
              className="username-input"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
