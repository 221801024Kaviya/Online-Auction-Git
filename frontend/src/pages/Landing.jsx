import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Top Navigation for SignUp & Login */}
      <div className="top-nav">
        <Link to="/signup" className="nav-button">Signup</Link>
        <Link to="/signin" className="nav-button">Login</Link>
      </div>

      {/* Main Content */}
      <div className="landing-content">
        <h1 className="title">Online Auction System</h1>
        <p className="quote">"The best place to bid and win exclusive items!"</p>
        <p className="subtext">
        Welcome to the Online Auction System, the ultimate platform for 
        seamless and transparent online bidding. Whether you're looking for rare 
        collectibles, high-end electronics, luxury goods, or everyday essentials,
        our auction system ensures fair competition, secure transactions, and an exciting bidding
        experience.
        </p>
      </div>

      {/* Start Bidding Button */}
      <div className="start-bidding-container">
        <Link to="/signup" className="start-bidding">Start Bidding</Link>
      </div>
    </div>
  );
};

export default Landing;
