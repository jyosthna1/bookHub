import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import BookShelveItem from '../BookShelveItem'

const bookShelvesTabs = [
  {
    id: 'ALL',
    displayText: 'All',
  },
  {
    id: 'READ',
    displayText: 'Read',
  },
  {
    id: 'CURRENTLY_READING',
    displayText: 'Currently Reading',
  },
  {
    id: 'WANT_TO_READ',
    displayText: 'Want To Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const TabItem = props => {
  const {tabDetails, activeTabCurrent, onClickTab} = props
  const {displayText, id} = tabDetails

  const activeTabClassName = activeTabCurrent
    ? 'tab-button-background-blue'
    : 'tab-button-background'

  const onClickTabValue = () => {
    onClickTab(id)
  }

  return (
    <li key={id} onClick={onClickTabValue}>
      <button type="button" className={`tab-button ${activeTabClassName}`}>
        {displayText}
      </button>
    </li>
  )
}

class BookShelves extends Component {
  state = {
    activeTab: bookShelvesTabs[0].id,
    apiStatus: apiStatusConstants.initial,
    bookShelvesArray: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getBookShelvesData()
  }

  getBookShelvesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeTab} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchInput}`
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
      const bookData = data.books.map(eachBookData => ({
        authorName: eachBookData.author_name,
        coverPic: eachBookData.cover_pic,
        id: eachBookData.id,
        rating: eachBookData.rating,
        readStatus: eachBookData.read_status,
        title: eachBookData.title,
      }))
      this.setState({
        bookShelvesArray: bookData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTab = value => {
    this.setState({activeTab: value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value}, this.getBookShelvesData)
  }

  onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      this.getBookShelvesData()
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
      <button className="failure-button" type="button">
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {bookShelvesArray} = this.state
    const bookShelvesArrayLength = bookShelvesArray.length === 0

    return (
      <>
        {bookShelvesArrayLength ? (
          <div className="not-found-container">
            <img
              src="https://res.cloudinary.com/dhcm3a6yw/image/upload/v1704451139/Group_aegii4.png"
              alt="no books"
              className="noBooksImage"
            />
            <h1 className="not-found-head">
              Your search for dsadsdsad did not find any matches.
            </h1>
          </div>
        ) : (
          <ul className="BookShelveItem-unorder">
            {bookShelvesArray.map(eachShelveItem => (
              <BookShelveItem
                details={eachShelveItem}
                key={eachShelveItem.id}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  apiStatusSwitch = () => {
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
    const {activeTab, searchInput, bookShelvesArray} = this.state

    return (
      <div className="book-shelves-container">
        <Header />
        <div className="book-shelves-small-devices">
          <div className="search-container">
            <input
              type="search"
              className="search"
              placeholder="search"
              onChange={this.onChangeSearch}
              value={searchInput}
              onKeyDown={this.onKeyDownEnter}
            />
            <button
              type="button"
              testid="searchButton"
              className="searchButton"
            >
              <BsSearch className="searchIcon" />
            </button>
          </div>
          <h1 className="bookShelvesHead">Bookshelves</h1>
          <ul className="bookshelves-tabs-container">
            {bookShelvesTabs.map(eachTabItem => (
              <TabItem
                id={eachTabItem.id}
                tabDetails={eachTabItem}
                activeTabCurrent={activeTab === eachTabItem.id}
                onClickTab={this.onClickTab}
              />
            ))}
          </ul>
          {this.apiStatusSwitch()}
        </div>
      </div>
    )
  }
}

export default BookShelves
