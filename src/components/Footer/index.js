import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="footer-container">
      <button className="google-button" type="button">
        <FaGoogle className="icon" />
      </button>
      <button className="google-button" type="button">
        <FaTwitter className="icon" />
      </button>
      <button className="google-button" type="button">
        <FaInstagram className="icon" />
      </button>
      <button className="google-button" type="button">
        <FaYoutube className="icon" />
      </button>
    </div>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
