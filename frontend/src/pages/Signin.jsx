import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon
import "./Signin.css";

const Signin = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <div className="signin-options">
            {/* <label>
              <input type="checkbox"/>Remember Me
            </label> */}

            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="google-signin">
          <button className="google-btn">
            <FcGoogle className="google-icon" /> Signin with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
