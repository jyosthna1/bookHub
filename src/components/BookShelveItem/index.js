import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BookShelveItem = props => {
  const {details} = props
  const {title, id, rating, authorName, coverPic, readStatus} = details

  return (
    <Link to={`/books/${id}`}>
      <li className="bookShelveListContainer">
        <img src={coverPic} className="cover-pic" alt={title} />
        <div className="detailsContainer">
          <h1 className="bookTitle">{title}</h1>
          <p className="authorName">{authorName}</p>
          <p className="rating">
            Avg Rating
            <BsFillStarFill className="starIcon" />
            {rating}
          </p>
          <p className="status">
            Status : <span className="statusData">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelveItem
