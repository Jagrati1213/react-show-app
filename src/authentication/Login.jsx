import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Profile from '../pages/Profile';
import { logIn } from '../store/slices/AuthSlice';

function Login() {
  //___ get data from input
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  //____ used to call methods from reducer
  const dispatch = useDispatch();

  //____ check the currentuser's status
  const { userExit } = useSelector((state) => state.user);

  const handlerSubmit = useCallback(
    (event) => {
      event.preventDefault();

      //check is fields empty or not
      if (username === '' || password === '') {
        return toast.error('fill all fields');
      } else {
        dispatch(logIn({ username: username.trim(), password: password.trim() }));
        setUserName('');
        setPassword('');
      }
    },
    [dispatch, password, username]
  );

  useEffect(() => {}, [userExit]);

  return userExit ? (
    <Profile />
  ) : (
    <div className="mt-10 flex justify-center items-center">
      <div className="md:w-[400px] w-auto bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
        <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
          <h1 className="md:text-2xl text-xl font-semibold text-slate">Welcome back!</h1>

          <form className="mt-8" onSubmit={handlerSubmit}>
            {/* Email */}
            <div>
              <Input
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
              />
            </div>

            {/* Password */}
            <div className="mt-8">
              <Input.Password
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Submit */}
            <button
              type="sumbit"
              className="btn_class w-full text-center block hover:bg-red-700 focus:outline-none mt-8"
            >
              Log In
            </button>

            <Link to="/signin">
              <p className="my-4 text-center">
                no account?
                <span className="text-red-500 mx-2 cursor-pointer hover:underline"> Sign in</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
