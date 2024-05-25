import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TabItem from '../TabItem'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeTab: bookshelvesList[0].value,
    bookDetailsData: [],
  }

  componentDidMount() {
    this.getBookshelvesData()
  }

  getBookshelvesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeTab} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const bookData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        bookDetailsData: bookData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          className="search"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  onClickTab = value => {
    this.setState({activeTab: value})
  }

  renderTabList = () => {
    const {activeTab} = this.state

    return (
      <ul className="un-order-tab-list">
        {bookshelvesList.map(eachTab => (
          <TabItem
            id={eachTab.id}
            tabDetails={eachTab}
            activeTabCurrent={activeTab === eachTab.value}
            onClickTab={this.onClickTab}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="blue" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-container-book">
      <img
        src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704263013/Group_7522_sbjwvs.png"
        alt="failure view"
        className="failureView-book"
      />
      <p className="failure-head-book">
        Something went wrong. Please try again
      </p>
      <Link to="/shelf">
        <button className="failure-button-book" type="button">
          Try Again
        </button>
      </Link>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelves-container">
        <Header />
        <div className="bookshelves-category-list">
          {this.renderSearchInput()}
          <div className="tab-items">
            <h1 className="tab-head">Bookshelves</h1>
            {this.renderTabList()}
          </div>
          <div className="book-details-render-container">
            {this.renderBookDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
