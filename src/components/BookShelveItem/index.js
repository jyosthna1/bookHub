import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BookShelveItem = props => {
  const {details} = props
  const {title, id, rating, authorName, coverPic, readStatus} = details

  return (
    <Link to={`/books/${id}`} className="link">
      <li className="bookShelveListContainerItems">
        <img src={coverPic} className="cover-pic-book" alt={title} />
        <div className="detailsContainer-bookshelve">
          <h1 className="bookTitle-bookshelve">{title}</h1>
          <p className="authorName-bookshelve">{authorName}</p>
          <div className="rating-container-bookshleves">
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
