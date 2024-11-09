import React, { useState } from "react";
import "../Auther/styles.css"; // Đảm bảo đường dẫn chính xác
import SignInForm from "../Auther/SingInForm"; // Đảm bảo tên file chính xác
import SignUpForm from "../Auther/SingUpForm"; // Đảm bảo tên file chính xác

export default function FormSing() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "display " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="FormSing">
      <h2 className="h2">Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="button ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">Enter your personal details and start your journey with us</p>
              <button
                className="button ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}