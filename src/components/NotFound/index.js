import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704527898/Group_7484_yuabvx.png"
      alt="not found"
      className="not-found"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="goBackButton">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
