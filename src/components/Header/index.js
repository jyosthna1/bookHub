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
            <ul>
              <Link to="/" className="link-style">
                <li className="pageName">Home</li>
              </Link>
              <Link to="/shelf" className="link-style">
                <li className="pageName">Bookshelves</li>
              </Link>
            </ul>
            <button type="button" className="logoutButton">
              Logout
            </button>
          </div>
          <HiMenu className="menuIcon" onClick={this.onClickChangeMenu} />
        </div>
        {smallDevicesMenu && (
          <div className="smallDevicesItems">
            <ul>
              <Link to="/" className="link-style">
                <li className="pageName">Home</li>
              </Link>
              <Link to="/shelf" className="link-style">
                <li className="pageName">Bookshelves</li>
              </Link>
            </ul>
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
