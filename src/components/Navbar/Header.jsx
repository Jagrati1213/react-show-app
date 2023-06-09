import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../../demo.png';
import MenuList from './MenuList';

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header className="header md:px-8">
      <div className="header_logo md:w-auto">
        {/* Logo */}
        <Link
          to="/"
          className="logo_img flex items-center md:w-[5rem] w-[3.5rem] h-[-webkit-fill-available]"
        >
          <img src={logo} alt="ajio logo" className="w-full object-cover mr-3" />
        </Link>

        {/* Hamburger */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="menu_btn md:hidden hover:text-black"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          <IconContext.Provider value={{ size: '30px' }}>
            {navbarOpen ? <GrClose /> : <AiOutlineMenuFold />}
          </IconContext.Provider>
        </button>
      </div>

      {/* Menulist */}
      <MenuList navbarOpen={navbarOpen} />
    </header>
  );
}

export default Header;
