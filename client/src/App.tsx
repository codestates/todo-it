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

interface UserInfo {
  id?: number;
  nickname?: string;
  email?: string;
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    axios
      .get('https://localhost:8000/users/me', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data);
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  }, [isLogin]);

  const LoginHandler = (token: string) => {
    setIsLogin(true);
    setAccessToken(token);
    console.log(accessToken);
  };

  const LogoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <BrowserRouter>
      <Header LogoutHandler={LogoutHandler} userInfo={userInfo}></Header>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <MainPage userId={userInfo.id}></MainPage>
            ) : (
              <LoginPage LoginHandler={LoginHandler} />
            )
          }
        ></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route
          path="/profile"
          element={<Profile userInfo={userInfo}></Profile>}
        />
        <Route
          path="/userinfosetting"
          element={<UserInfoSettingPage></UserInfoSettingPage>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
