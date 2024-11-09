const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();

// Cấu hình CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Các nguồn cho phép
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP cho phép
    credentials: true // Nếu cần thiết
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Đăng nhập
app.post('/api/signin', (req, res) => {
    const { identifier, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(query, [identifier, identifier], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // So sánh mật khẩu mã hóa
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing password:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (!result) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Đăng nhập thành công
            res.json({ message: 'Login successful' });
        });
    });
});

// Đăng ký
app.post('/api/signup', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    // Kiểm tra email và username riêng biệt
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(checkEmailQuery, [email], (err, emailResults) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (emailResults.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Nếu email không tồn tại, kiểm tra username
        db.query(checkUsernameQuery, [username], (err, usernameResults) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (usernameResults.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Error creating user' });
                }

                // Thêm người dùng mới vào cơ sở dữ liệu với mật khẩu đã mã hóa
                const insertQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
                db.query(insertQuery, [email, username, hashedPassword], (err) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.status(500).json({ message: 'Database error' });
                    }
                    res.json({ message: 'Registration successful' });
                });
            });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});