import './index.css'

const BookShelveItem = props => {
  const {details} = props
  const {title, id, rating, authorName, coverPic, readStatus} = details

  return (
    <li>
      <img src={coverPic} className="cover-pic" alt={title} />
    </li>
  )
}

export default BookShelveItem
