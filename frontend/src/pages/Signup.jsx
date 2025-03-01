import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";  // Google icon
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit"  className="signup-btn">Signup</button>
        </form>

        <p className="signin-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>

        <div className="google-signin">
          <button className="google-btn">
            <FcGoogle className="google-icon" /> Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
