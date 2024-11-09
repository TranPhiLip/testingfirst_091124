import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "", // Thay đổi từ email thành identifier
    password: "",
  });

  // Lưu lại trình duyệt khi đăng nhập thành công.
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/events', { replace: true }); // Nếu đã đăng nhập, chuyển hướng đến trang events
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
    setMessage('');
  };

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "identifier": // Kiểm tra identifier
        if (!value) {
          error = "Email or username is required"; // Th
           // Thông báo lỗi cho trường identifier
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

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    // Kiểm tra nếu các trường không trống
    if (!formData.identifier || !formData.password) {
      setMessage('Please enter both email/username and password.');
      return;
    }

    // Gửi yêu cầu đăng nhập đến máy chủ
    const response = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Xử lý phản hồi từ máy chủ
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data.message);
      
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Giả định rằng `data.user` chứa thông tin người dùng
      console.log("Navigating to /events"); // Thêm log ở đây
      navigate('/events', { replace: true }); // Chuyển hướng đến trang events
    } else {
      const data = await response.json();
      console.error("Error response from server:", data.message);
      setMessage(data.message || 'Failed to log in.');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="form">
      <h1 className="h1">Sign in</h1>
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
        <span className="span">or use your account</span>
        <input
          className="input"
          type="text"
          placeholder="Email or Username"
          name="identifier"
          value={formData.identifier}
          onChange={handleInputChange}
        />
        {errors.identifier && <div className="invalid-feedback">{errors.identifier}</div>}

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}

        {message && <div className="text-danger">{message}</div>}

        <a href="/" className="a">Forgot your password?</a>
        <button className="button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;