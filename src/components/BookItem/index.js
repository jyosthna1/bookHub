import './index.css'

const BookItem = props => {
  const {details} = props
  const {title, coverPic, authorName} = details
  return (
    <div className="book-container">
      <img src={coverPic} className="BookImage" alt={title} />
      <h1 className="title">{title}</h1>
      <p className="authorName">{authorName}</p>
    </div>
  )
}

export default BookItem
