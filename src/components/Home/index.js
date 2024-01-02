import Slider from 'react-slick'
import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'
import Header from '../Header'

class Home extends Component {
  state = {topRelatedBooks: []}

  componentDidMount() {
    this.getTopRelatedBooks()
  }

  getTopRelatedBooks = async () => {
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookie.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const getTopRelatedData = data.books.map(eachBook => ({
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      id: eachBook.id,
      title: eachBook.title,
    }))
    this.setState({topRelatedBooks: getTopRelatedData})
  }

  render() {
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
        </div>
      </div>
    )
  }
}

export default Home
