// import { Badge } from 'antd';
import React from 'react';
import { IconContext } from 'react-icons';
// import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MenuList({ navbarOpen }) {
  //____ Get the current user
  //   const { userDetails } = useSelector((state) => state.user);
  //   const currentUser = userDetails.find((i) => i.isUser === true);

  //____ Set the quantity as header
  // const [count, setCount] = useState(0);
  // const [wish, setWish] = useState(0);
  // let bagCount = 0;

  //   useEffect(() => {
  //     currentUser?.userCart.map((item) => {
  //       bagCount += Number(item?.quantity);
  //     });
  //     setCount(bagCount);
  //     setWish(currentUser?.userWish.length);
  //   }, [userDetails]);

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
              <Link to="/login" className="block p-2 bg-slate-800 text-white rounded-full">
                <GoPerson />
              </Link>
            </IconContext.Provider>
          </li>

          {/* <li className="md:my-0 my-4">
            <Badge count={wish} showZero className="block text-slate">
              <IconContext.Provider value={{ size: '26px', color: '#2c4152' }}>
                <Link to="/whislist" className="block text-slate">
                  <FaHeart />
                </Link>
              </IconContext.Provider>
            </Badge>
          </li> */}
          {/* <li className="md:my-0 my-4">
            <Badge count={count} showZero className="block text-slate">
              <IconContext.Provider value={{ size: '26px', color: '#2c4152' }}>
                <Link to="/cart">
                  <FaShoppingBag />
                </Link>
              </IconContext.Provider>
            </Badge>
          </li> */}
        </ul>
      </div>
    </>
  );
}
export default MenuList;
