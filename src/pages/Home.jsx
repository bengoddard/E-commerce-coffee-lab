import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <h1>Coffee R Us</h1>
        <p>
          The go to store for your coffee needs
        </p>
      </div>
    </>
  )
}

export default Home