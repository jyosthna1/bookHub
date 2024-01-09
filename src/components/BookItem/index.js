import './index.css'

const BookItem = props => {
  const {details} = props
  const {title, coverPic, authorName} = details
  return (
    <div className="book-container">
      <img src={coverPic} className="BookImage" alt={title} />
      <h1 className="titleOfBook">{title}</h1>
      <h1 className="authorNameOfBook">{authorName}</h1>
    </div>
  )
}

export default BookItem
