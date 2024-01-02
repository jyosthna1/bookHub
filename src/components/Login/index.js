import './index.css'
import Cookie from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 3})

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
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <form className="login-form" onSubmit={this.onSubmitUserDetails}>
        <img
          src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1703999381/Rectangle_1467_sgtzoo.png"
          alt="login website logo"
          className="loginWebsiteLogo"
        />
        <div className="loginDetailsContainer">
          <div className="login-details">
            <img
              src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704001373/Group_7732_fknwex.png"
              alt="website login"
              className="websiteLogin"
            />
            <div className="username-container">
              <label htmlFor="username" className="usernameLabel">
                username*
              </label>
              <input
                type="text"
                className="userInput"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password" className="usernameLabel">
                Password*
              </label>
              <input
                type="password"
                className="userInput"
                id="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {showSubmitError && <p className="errorMsg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default Login
