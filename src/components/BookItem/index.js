import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {details} = props
  const {title, coverPic, authorName, id} = details
  return (
    <Link to={`/books/${id}`} className="link-style-item-home">
      <div className="book-container">
        <img src={coverPic} className="BookImage" alt={title} />
        <h1 className="titleOfBook">{title}</h1>
        <p className="authorNameOfBook">{authorName}</p>
      </div>
    </Link>
  )
}

export default BookItem
