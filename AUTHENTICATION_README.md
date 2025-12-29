# 🚀 Learn Frontend - Cosmic Authentication System

Hệ thống đăng nhập/đăng ký với giao diện vũ trụ lấp lánh tuyệt đẹp!

## ✨ Tính năng

### 🔐 Authentication
- **Đăng nhập**: Form đăng nhập với validation và error handling
- **Đăng ký**: Form đăng ký với xác nhận mật khẩu
- **Đăng xuất**: Xóa tokens và chuyển về trang chủ
- **Auto Refresh Token**: Tự động làm mới token khi hết hạn
- **Protected Routes**: Bảo vệ các routes cần authentication

### 🎨 UI/UX
- **Landing Page vũ trụ lấp lánh** với:
  - 3 lớp ngôi sao chuyển động
  - Hành tinh bay lơ lửng
  - Shooting stars (sao băng)
  - Hiệu ứng glow text
  - Glass morphism cards
  - Responsive design

- **Auth Pages** với:
  - Background vũ trụ đầy sao
  - Form với hiệu ứng glow khi focus
  - Error messages với animation
  - Loading states
  - Smooth transitions

### 🛠️ Tech Stack
- **React 19** + **TypeScript**
- **React Router** - Routing
- **Axios** - HTTP client với interceptors
- **Context API** - State management
- **CSS3** - Animations & Effects

## 📁 Cấu trúc dự án

```
src/
├── api/
│   ├── axiosClient.ts      # Axios instance với interceptors
│   └── authService.ts      # Auth API calls (login, register, logout, refresh)
├── contexts/
│   └── AuthContext.tsx     # Authentication context & provider
├── pages/
│   ├── LandingPage.tsx     # Trang chủ vũ trụ lấp lánh
│   ├── LoginPage.tsx       # Trang đăng nhập
│   └── RegisterPage.tsx    # Trang đăng ký
├── styles/
│   ├── LandingPage.css     # Styles cho landing page
│   └── AuthPages.css       # Styles cho auth pages
├── types/
│   └── auth.ts            # TypeScript interfaces
├── App.tsx                # Main app với routing
└── main.tsx              # Entry point
```

## 🚀 Cách sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

### 3. Build cho production
```bash
npm run build
```

## 🔧 Cấu hình Backend

Trong file `src/api/axiosClient.ts`, thay đổi `baseURL` để trỏ đến backend của bạn:

```typescript
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Thay đổi port/URL tùy backend
    // ...
});
```

## 📡 API Endpoints yêu cầu

Backend cần implement các endpoints sau:

### Auth Endpoints
- `POST /api/auth/login` - Đăng nhập
  ```json
  Request: { "username": "user", "password": "pass123" }
  Response: { "id": 1, "username": "user", "accessToken": "...", "refreshToken": "..." }
  ```

- `POST /api/auth/register` - Đăng ký
  ```json
  Request: { "username": "user", "email": "user@email.com", "password": "pass123" }
  Response: { "id": 1, "username": "user", "email": "...", "accessToken": "...", "refreshToken": "..." }
  ```

- `POST /api/auth/refresh` - Làm mới token
  ```json
  Request: { "refreshToken": "..." }
  Response: { "accessToken": "...", "refreshToken": "..." }
  ```

- `POST /api/auth/logout` - Đăng xuất
  ```json
  Request: {} (với Bearer token trong header)
  Response: { "message": "Logged out successfully" }
  ```

- `GET /api/auth/me` - Lấy thông tin user hiện tại
  ```json
  Request: {} (với Bearer token trong header)
  Response: { "id": 1, "username": "user", "email": "..." }
  ```

## 🎯 Sử dụng Auth Service

### Trong Component

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
    const { user, isAuthenticated, login, logout } = useAuth();

    const handleLogin = async () => {
        try {
            await login({ username: 'user', password: 'pass' });
            // Đăng nhập thành công
        } catch (error) {
            // Xử lý lỗi
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <p>Xin chào, {user?.username}!</p>
            ) : (
                <button onClick={handleLogin}>Đăng nhập</button>
            )}
        </div>
    );
}
```

### Gọi API trực tiếp

```tsx
import authService from '../api/authService';

// Đăng nhập
const response = await authService.login({ username, password });

// Đăng ký
const response = await authService.register({ username, email, password });

// Đăng xuất
await authService.logout();

// Kiểm tra đã đăng nhập chưa
const isLoggedIn = authService.isAuthenticated();
```

## 🎨 Tùy chỉnh Theme

### Thay đổi màu sắc
Trong các file CSS, bạn có thể thay đổi gradients:

```css
/* Landing page buttons */
.cta-button.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Auth button */
.auth-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Tùy chỉnh tốc độ animation
```css
.stars {
    animation: animateStars 50s linear infinite; /* Thay đổi 50s */
}
```

## 🔒 Bảo mật

- ✅ Tokens được lưu trong `localStorage`
- ✅ Auto refresh token khi hết hạn
- ✅ Tự động redirect về login khi refresh thất bại
- ✅ Authorization header tự động được thêm vào mọi request
- ✅ Password validation (minimum 6 ký tự)
- ✅ Confirm password matching

## 📱 Responsive Design

Giao diện tự động điều chỉnh cho:
- 📱 Mobile (< 768px)
- 💻 Tablet
- 🖥️ Desktop

## 🐛 Troubleshooting

### Lỗi CORS
Nếu gặp lỗi CORS, cần cấu hình backend cho phép requests từ frontend origin.

### Token không tự động refresh
Kiểm tra backend endpoint `/api/auth/refresh` có hoạt động đúng không.

### Ngôi sao không hiển thị
Một số trình duyệt có thể block SVG inline trong CSS. Thử dùng trình duyệt khác hoặc host SVG files.

## 📄 License

MIT License - Tự do sử dụng cho mọi mục đích!

## 🌟 Credits

Design inspiration: Cosmic & Space themes
Made with ❤️ and ✨

---

**Happy Coding! 🚀**
