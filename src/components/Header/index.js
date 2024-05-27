import {HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {smallDevicesMenu: false}

  onClickChangeMenu = () => {
    this.setState(prevState => ({
      smallDevicesMenu: !prevState.smallDevicesMenu,
    }))
  }

  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getHeaderLinks = () => (
    <ul className="header-un-order-list">
      <li className="link-option">Home</li>
      <li className="link-option">Bookshelves</li>
      <button type="button" className="logout-button">
        Logout
      </button>
    </ul>
  )

  render() {
    const {smallDevicesMenu} = this.state
    return (
      <nav>
        <div className="header-nav-container">
          <img
            src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704001373/Group_7732_fknwex.png"
            alt="website logo"
            className="website-logo-header"
          />
          <HiMenu size="28" className="menu-icon" />
          {this.getHeaderLinks()}
        </div>
      </nav>
    )
  }
}

export default Header
