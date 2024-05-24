import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BookShelveItem = props => {
  const {details} = props
  const {title, id, rating, authorName, coverPic, readStatus} = details

  return (
    <Link to={`/books/${id}`} className="link">
      <li className="bookShelveListContainerItems">
        <img src={coverPic} className="cover-pic" alt={title} />
        <div className="detailsContainer">
          <h1 className="bookTitle">{title}</h1>
          <p className="authorName">{authorName}</p>
          <div>
            <p className="ratingOfItem">Avg Rating</p>
            <BsFillStarFill className="starIcon" />
            <p className="ratingOfItem">{rating}</p>
          </div>

          <p className="statusOfItem">
            Status: <span className="statusData">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelveItem
