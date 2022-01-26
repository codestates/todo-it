import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { TeamMakingPage } from './pages/TeamMakingPage/TeamMakingPage';
import { Profile } from './pages/ProfilePage/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserInfoSettingPage } from './pages/UserInfoSettingPage/UserInfoSettingPage';
import Header from './components/Header/Header';
import { UserTeamSettingPage } from './pages/UserTeamSettingPage/UserTeamSettingPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const LoginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <BrowserRouter>
      <Header></Header>
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
        <Route path="signup" element={<SignupPage></SignupPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
