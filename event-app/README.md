# Hướng dẫn

## Tạo thư mục API: 
 `mkdir backend`
 `cd backend`

- Cài đặt các thư viện cần thiết:
 `npm init -y`
 `npm install express mysql dotenv`
 - cài đặt mã hóa password: `npm install bcrypt`

**Lưu ý: Nếu có thư mục riêng thì hãy trỏ tới thư mục đó rồi cài đặt. Ở đây là của thư mục backend.**

**Chẳng hạn: `cd event-app`, `cd backend`**

- Trong thư mục backend, tạo một tệp có tên ".env" để lưu thông tin kết nối MySQL:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306

**Lưu ý: Thay your_mysql_password và your_database_name bằng thông tin của bạn.**

- ví du:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=        
DB_NAME=user
DB_PORT=3306

**Lưu ý: Nếu không có password thì để trống.**

- Tạo một tệp có tên index.js ( xem trên file index.js ) trong thư mục backend và thêm mã sau để kết nối với MySQL và tạo API.

- Nếu chưa có XAMPP, hãy tải XAMPP và cài đặt: https://www.apachefriends.org/download.html

- Sau khi tải và cài đặt xong, mở và chọn: 
+ Apache -> Start
+ MySQL -> Start

- Mở trình duyệt lên, vào địa chỉ hoặc chọn Admin của MySQL trên XAMPP: http://localhost/phpmyadmin/

- Khi vào localhost trên, chọn mục "SQL" và thực hiện các bước sau:
+ Tạo cơ sở dữ liệu nếu nó chưa tồn tại: Nếu cơ sở dữ liệu "user" chưa được tạo, hãy tạo nó bằng cách chạy lệnh sau: `CREATE DATABASE user`;
+ Chọn cơ sở dữ liệu: Sau khi tạo xong cơ sở dữ liệu, chọn nó để sử dụng: `USE user` ( hoặc kích chọn thanh bên trái - `user`);
+ Tạo bảng trong cơ sở dữ liệu: Bây giờ bạn có thể tạo bảng "users" trong cơ sở dữ liệu "user": (Chọn mục SQL để tạo)

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


**Lưu ý: Nếu bạn muốn tạo cơ sở dữ liệu với tên khác, thay user bằng tên mong muốn và đảm bảo sử dụng cùng tên đó trong các lệnh tiếp theo**
 
## cài đặt thư viện
- react-router-dom: `npm i react-router-dom`
- json-server: `npm i json-server`
- react-icon: `npm i react-icons`

## Lưu ý: 
- Nếu có thư mục riêng thì hãy trỏ tới thư mục đó rồi cài đặt. Ở đây là của thư mục frontend.
- Vì mình tạo dự án mặc định của React trước nên bỏ vào thư mục frontend.

**Chẳng hạn: `cd event-app`, `cd frontend`**

## Vào thư mục Frontend và Backend:
- vào backend:
 `cd event-app`
 `cd backend`
 
- Hãy mở "terminal" mới:

- vào frontend:
 `cd event-app`
 `cd frontend`

## Frontend
- Chạy lệnh server của db.json (Chạy đầu tiên): 
 `json-server db.json`
- Cuối cùng chạy lệnh React: 
 `npm start`

**Lưu ý: Nếu chạy lệnh `npm start` bảo mở cổng mới, chẳng hạn: http://localhost:3001 thì nhấn chữ 'y' và enter.**

## Backend:
- Chạy lệnh server của backend: node name_file.js 
ví dụ: 
 `node index.js` 

 ## Lưu ý:
- Nếu frontend và backend của bạn không chạy trên cùng một cổng (port), cần đảm bảo rằng đã cấu hình CORS trong backend để cho phép yêu cầu từ frontend. Có thể sử dụng middleware cors trong Express như sau:

Ở đây, mình chạy nên cài đặt "cors".

`const cors = require('cors');`
`app.use(cors());`

- Cài đặt cors: `npm install cors`

**Lưu ý: đoạn trên hãy bỏ vào file "index.js"**.

## Đăng ký và đăng nhập tài khoản:
Chẳng hạn:
- Đăng ký:
+ Email: tranphilip.1610@gmail.com
+ Username: tplip18 hoặc Phi Lip
+ Password: 123456
**Lưu ý: vì mật khẩu được mã hóa nên cố gắng đừng quên.**

- Đăng nhập:
+ Email: tranphilip.1610@gmail.com hoặc Username: tplip18 hoặc Phi Lip
+ Password: 123456

## Phiển bản React và Node:
- React version: 18.3.1
( Câu lệnh: `npm view react version` )

- Node version: v18.17.1
( Câu lệnh: `node -v` )