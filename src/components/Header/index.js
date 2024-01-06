import {HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {smallDevicesMenu: false}

  onClickChangeMenu = () => {
    this.setState({
      smallDevicesMenu: true,
    })
  }

  onClickCloseMenu = () => {
    this.setState({
      smallDevicesMenu: false,
    })
  }

  render() {
    const {smallDevicesMenu} = this.state
    return (
      <div className="header-page">
        <div className="header-container">
          <Link to="/" className="link-style">
            <img
              src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704001373/Group_7732_fknwex.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <div className="page-icons-container">
            <Link to="/" className="link-style">
              <p className="pageName">Home</p>
            </Link>
            <Link to="/shelf" className="link-style">
              <p className="pageName">Bookshelves</p>
            </Link>
            <button type="button" className="logoutButton">
              Logout
            </button>
          </div>
          <HiMenu className="menuIcon" onClick={this.onClickChangeMenu} />
        </div>
        {smallDevicesMenu && (
          <div className="smallDevicesItems">
            <Link to="/" className="link-style">
              <p className="pageName">Home</p>
            </Link>
            <Link to="/shelf" className="link-style">
              <p className="pageName">Bookshelves</p>
            </Link>
            <button type="button" className="logoutButton">
              Logout
            </button>
            <IoIosCloseCircle
              className="closeIcon"
              onClick={this.onClickCloseMenu}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Header
