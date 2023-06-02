import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../authentication/Login';
import SignIn from '../authentication/signin';
import Header from '../components/Navbar/Header';
import Footer from '../components/footer/Footer';
import Error from './Error';
import Home from './Home';
import Profile from './Profile';
import SingleShow from './SingleShow';

function Mainpage() {
  return (
    <Router>
      <main className="h-full min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="mt-[90px] w-full min-h-screen py-8">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:showId" element={<SingleShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Toaster />
        <Footer />
      </main>
    </Router>
  );
}

export default Mainpage;
