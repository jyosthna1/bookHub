import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
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
    this.setState({activeTab: value}, this.getBookShelvesData)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
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
          <ul className="BookShelveItem-unorder">
            {bookShelvesArray.map(eachShelveItem => (
              <BookShelveItem
                details={eachShelveItem}
                key={eachShelveItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default BookShelves
