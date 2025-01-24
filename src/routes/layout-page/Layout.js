import React,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/FooterBar/Footer';
// import './Layout.css';


function Layout() {



  return (
    <>
    <div >
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
    </>
  );
}

export default Layout;
