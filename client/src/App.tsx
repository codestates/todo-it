import React, { useEffect, useState } from 'react';
import './App.css';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Profile } from './pages/ProfilePage/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserInfoSettingPage } from './pages/UserInfoSettingPage/UserInfoSettingPage';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    axios
      .get('https://localhost:8000/users/me', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [isLogin]);

  const LoginHandler = (accessToken: string) => {
    setIsLogin(true);
    setAccessToken(accessToken);
  };

  const LogoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <BrowserRouter>
      <Header LogoutHandler={LogoutHandler}></Header>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <MainPage userId={1}></MainPage>
            ) : (
              <LoginPage LoginHandler={LoginHandler} />
            )
          }
        ></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route path="/profile" element={<Profile></Profile>} />
        <Route
          path="/userinfosetting"
          element={<UserInfoSettingPage></UserInfoSettingPage>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
