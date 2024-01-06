import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'
import Header from '../Header'
import BookItem from '../BookItem'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRelatedBooks: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRelatedBooks()
  }

  getTopRelatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      const getTopRelatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      this.setState({
        topRelatedBooks: getTopRelatedData,
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

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704263013/Group_7522_sbjwvs.png"
        alt="failure view"
        className="failureView"
      />
      <h1 className="failure-head">Something went wrong, Please try again.</h1>
      <Link to="/" className="link-style">
        <button className="failure-button" type="button">
          Try Again
        </button>
      </Link>
    </div>
  )

  renderSuccessView = () => {
    const {topRelatedBooks} = this.state
    const settings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 4,
    }
    const settings1 = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 2,
    }
    return (
      <>
        <div className="slider-large-devices">
          <Slider {...settings}>
            {topRelatedBooks.map(eachBook => (
              <BookItem key={eachBook.id} details={eachBook} />
            ))}
          </Slider>
        </div>
        <div className="slider-small-devices">
          <Slider {...settings1}>
            {topRelatedBooks.map(eachBook => (
              <BookItem key={eachBook.id} details={eachBook} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderRelatedBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {topRelatedBooks} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="find-info-container">
          <h1 className="findHead">Find Your Next Favorite Books?</h1>
          <p className="description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button className="find-button" type="button">
            Find Books
          </button>
        </div>
        <div className="slider-container">
          <div className="header-button-container">
            <h1 className="slider-head">Top Related Books</h1>
            <Link to="/shelf" className="link-style">
              <button className="find-button-large" type="button">
                Find Books
              </button>
            </Link>
          </div>
          {this.renderRelatedBooks()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
