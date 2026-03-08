import React, { useState } from "react";
import "./SignUp.css";
import OlxLogo from "../../assets/OlxLogo";
import { Link } from "react-router-dom";
import { signup } from "../../Firebase/firebase";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  //sign-up-function
  const user_auth = async (e) => {
    e.preventDefault();
    await signup(name, email, password, phoneNumber);
  }

  return (
    <div className="signupContainer">
      <div className="signupForm">
        <div className="logoContainer">
          <OlxLogo />
        </div>
        <form>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              type="text"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="formGroup">
            <label htmlFor="phone">Phone</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="signupBtn" onClick={user_auth}>
            Sign Up
          </button>
        </form>
        <div className="loginRedirect">
          <span>Already a user? </span>
          <Link to={'/login'}>
            <button className="loginBtn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
