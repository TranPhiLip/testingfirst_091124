import React, { useState } from "react";

const SignUpForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
    setMessage('');
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "username":
        if (!value) {
          error = "Username is required";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password } = formData; // Lấy giá trị từ formData

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }), // Gửi đúng dữ liệu
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Xử lý đăng ký thành công
      setMessage('Registration successful!');
      // Có thể reset form hoặc chuyển hướng người dùng
    } catch (error) {
      console.error('Error response from server:', error);
      setMessage(error.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="form">
        <h1 className="h1">Create Account</h1>
        <div className="social-container">
          <a href="/" className="a social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="/" className="a social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="/" className="a social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span className="span">or use your email for registration</span>
        <input
          className="input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        <input
          className="input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        <input
          className="input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        {message && <div className="text-danger">{message}</div>}
        <button className="button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;