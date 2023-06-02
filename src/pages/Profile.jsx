import { Avatar, List } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/slices/AuthSlice';

function Profile() {
  //___ call methods from reducer
  const dispatch = useDispatch();

  //___ get current user
  const { userMovieDetails } = useSelector((state) => state.user);
  const currentUser = userMovieDetails.find((ele) => ele.isUser === true);

  //____user logout
  const handleLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <main className="profile flex items-center flex-col">
      <div className="flex md:justify-between justify-center items-center rounded my-10 py-6 w-[90%] flex-wrap md:flex-row flex-col">
        <h3 className="text-3xl text-slate font-semibold text-center">
          welcome, <span className="uppercase">{currentUser.user.name}</span>
        </h3>
        <button onClick={handleLogout} className="btn_class mt-8 hover:bg-red-900">
          Log Out
        </button>
      </div>

      {/* booking Items */}
      {
        <div className="border-t-2 border-slate-400 p-10 w-[90%] px-10 rounded">
          {currentUser.userOrder.length > 0 ? (
            <>
              <p className="text-xl pb-8">Booking Tickets</p>
              <List
                className=" h-72 overflow-y-scroll"
                itemLayout="horizontal"
                dataSource={currentUser.userOrder}
                renderItem={(item) => (
                  <List.Item scroll={{ x: 300, y: 300 }} key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.image.original} />}
                      title={item.name}
                      description={item.language}
                    />
                  </List.Item>
                )}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      }
    </main>
  );
}
export default Profile;
