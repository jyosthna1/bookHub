import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <ul className="footer-container">
      <li>
        <button className="google-button" type="button">
          <FaGoogle className="icon" />
        </button>
      </li>
      <li>
        <button className="google-button" type="button">
          <FaTwitter className="icon" />
        </button>
      </li>
      <li>
        <button className="google-button" type="button">
          <FaInstagram className="icon" />
        </button>
      </li>
      <li>
        <button className="google-button" type="button">
          <FaYoutube className="icon" />
        </button>
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
