import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
import  Brand from '../../assets/logo.png'
// import './Navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <>
    {/* <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Brand} alt="" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <CiMenuFries color='black' size={28} />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav> */}
    </>
  )
}

export default Navbar
