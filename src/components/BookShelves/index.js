import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import Header from '../Header'

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
    id: 'CURRENTLY READING',
    displayText: 'Currently Reading',
  },
  {
    id: 'WANT TO READ',
    displayText: 'Want To Read',
  },
]

const TabItem = props => {
  const {tabDetails, activeTabCurrent} = props
  const {displayText, id} = tabDetails

  const activeTabClassName = activeTabCurrent
    ? 'tab-button-background-blue'
    : 'tab-button-background'

  return (
    <li key={id}>
      <button type="button" className={`tab-button ${activeTabClassName}`}>
        {displayText}
      </button>
    </li>
  )
}

class BookShelves extends Component {
  state = {activeTab: bookShelvesTabs[0].displayText}

  render() {
    const {activeTab} = this.state

    return (
      <div className="book-shelves-container">
        <Header />
        <div className="book-shelves-small-devices">
          <div className="search-container">
            <input type="search" className="search" placeholder="search" />
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
                activeTabCurrent={activeTab === eachTabItem.displayText}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default BookShelves
