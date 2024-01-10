import './index.css'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetailsData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetailsData()
  }

  convertDetails = data => ({
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
  })

  getBookDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const bookDetailsInfo = this.convertDetails(data.book_details)
      this.setState({
        bookDetailsData: bookDetailsInfo,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="blue" height="50" width="50" />
    </div>
  )

  renderFailureView = bookDetailsData => {
    const {id} = bookDetailsData
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704263013/Group_7522_sbjwvs.png"
          alt="failure view"
          className="failureView"
        />
        <h1 className="failure-head">
          Something went wrong, Please try again.
        </h1>
        <Link to={`/books/${id}`}>
          <button className="failure-button" type="button">
            Try Again
          </button>
        </Link>
      </div>
    )
  }

  renderBookDetailsPage = () => {
    const {bookDetailsData} = this.state
    const {
      authorName,
      title,
      id,
      coverPic,
      aboutAuthor,
      aboutBook,
      rating,
      readStatus,
    } = bookDetailsData
    return (
      <div>
        <div className="bookDetailsContainer">
          <div className="book-image-details-container">
            <img src={coverPic} alt={title} className="cover-pic" />
            <div className="book-details-info-container">
              <h1 className="title">{title}</h1>
              <p className="author-name">{authorName}</p>
              <p className="rating">
                Avg Rating
                <BsFillStarFill className="starIcon" />
                {rating}
              </p>
              <p className="status">
                Status:<span className="statusData">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <h1 className="authorHead">About Author</h1>
          <p className="aboutAuthorDescription">{aboutAuthor}</p>
          <h1 className="authorHead">About Book</h1>
          <p className="aboutAuthorDescription">{aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
  }

  bookDetailsPage = () => {
    const {apiStatus, bookDetailsData} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView(bookDetailsData)
      case apiStatusConstants.success:
        return this.renderBookDetailsPage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-container-page">
        <Header />
        {this.bookDetailsPage()}
      </div>
    )
  }
}

export default BookDetails
