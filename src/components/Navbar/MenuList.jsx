import React from 'react';
import { IconContext } from 'react-icons';
import { GoPerson } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MenuList({ navbarOpen }) {
  //____ Get the current user
  const { userMovieDetails } = useSelector((state) => state.user);
  const currentUser = userMovieDetails.find((i) => i.isUser === true);

  return (
    <>
      <div className={`w-full md:block md:w-auto z-50 menu ${navbarOpen ? 'block' : 'hidden'} `}>
        <ul className="flex flex-col p-4 md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:bg-white text-slate font-semibold hover:text-black text-lg  items-center">
          <li>
            <Link to="/" className="block py-4 px-3 text-slate hover:text-black md:p-0">
              Home
            </Link>
          </li>
          <li className="md:my-0 my-4">
            <IconContext.Provider value={{ size: '20px' }}>
              <Link
                to="/login"
                className="block p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full"
              >
                <GoPerson />
              </Link>
            </IconContext.Provider>
          </li>
          {!currentUser ? (
            <li className="md:my-0 my-4  bg-slate-800 hover:bg-slate-700 text-white rounded p-2">
              <Link to={'/signin'}>create Account</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
}
export default MenuList;
