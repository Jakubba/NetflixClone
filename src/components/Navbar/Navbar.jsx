import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        navRef.current.classList.add('navbar-dark');
      } else {
        navRef.current.classList.remove('navbar-dark');
      }
    };
  });
  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='netflix logo'></img>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt='icon search' className='icons'></img>
        <p>Children</p>
        <img src={bell_icon} alt='icon bell' className='icons'></img>
        <div className='navbar-profile'>
          <img src={profile_img} alt='img profile' className='profile'></img>
          <img src={caret_icon} alt=''></img>
          <div className='dropdown'>
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out of Netflix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
