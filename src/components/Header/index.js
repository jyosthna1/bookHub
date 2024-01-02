import {HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import {Component} from 'react'
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
          <img
            src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704001373/Group_7732_fknwex.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="page-icons-container">
            <p className="pageName">Home</p>
            <p className="pageName">Bookshelves</p>
            <button type="button" className="logoutButton">
              Logout
            </button>
          </div>
          <HiMenu className="menuIcon" onClick={this.onClickChangeMenu} />
        </div>
        {smallDevicesMenu && (
          <div className="smallDevicesItems">
            <p className="pageName">Home</p>
            <p className="pageName">Bookshelves</p>
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
