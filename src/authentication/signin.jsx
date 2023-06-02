import { Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sigIn } from '../store/slices/AuthSlice';

function SignIn() {
  //_____ Make userObject
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  //_____ Get userDetails methods from reducer
  const dispatch = useDispatch();

  //_____ Store User Details
  const handlerSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (name === '' || username === '' || password === '') {
        return toast.error('fill all fields');
      } else {
        dispatch(
          sigIn({
            name: name.trim(),
            username: username.trim(),
            password: password.trim(),
          })
        );
        setName('');
        setUserName('');
        setPassword('');
      }
    },
    [dispatch, name, password, username]
  );

  return (
    <div className=" mt-10 flex justify-center items-center">
      <div className="md:w-[400px] w-auto bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
        <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
          <h1 className="md:text-2xl text-xl font-semibold">Hello, Lets Connect!</h1>

          <form className="mt-8" onSubmit={handlerSubmit}>
            {/* Name */}
            <div>
              <Input
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* Email */}
            <div className="mt-8">
              <Input
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
              />
            </div>

            {/* Password */}
            <div className="mt-8 relative">
              <Input.Password
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Submit */}
            <button
              type="sumbit"
              className="mt-8 hover:bg-red-900 block w-full focus:outline-none btn_class"
            >
              Sign In
            </button>

            <Link to="/login">
              <p className="my-4 text-center">
                already have account?
                <span className="text-red-500 mx-2 cursor-pointer hover:underline"> Log In</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
