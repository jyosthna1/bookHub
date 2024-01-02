import './index.css'
import Header from '../Header'

const Home = () => (
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

export default Home
