# 🐛 DEBUG - Sửa lỗi giao diện trắng

## ✅ Đã sửa:

### 1. Cập nhật RegisterRequest khớp với backend
- ❌ Trước: có email
- ✅ Sau: chỉ có username và password

### 2. Sửa lỗi TypeScript
- ✅ Bỏ `any` type trong error handling
- ✅ Fix ReactNode import

### 3. Tối ưu AuthProvider
- ✅ Đổi `isLoading` mặc định thành `false` để không block UI
- ✅ Chỉ gọi API khi có token trong localStorage

### 4. Thêm debug tools
- ✅ ErrorBoundary để catch và hiển thị lỗi
- ✅ TestPage để kiểm tra cơ bản

## 🔍 Cách kiểm tra:

### Test các trang:
1. http://localhost:3001/test - Test page cơ bản
2. http://localhost:3001/login - Trang đăng nhập
3. http://localhost:3001/register - Trang đăng ký
4. http://localhost:3001/ - Landing page

### Kiểm tra console trong browser:
- Nhấn F12 để mở DevTools
- Xem tab Console có lỗi gì không
- Xem tab Network có request nào thất bại không

## 🎯 Nếu vẫn trắng màn hình:

### Nguyên nhân có thể:
1. **CSS không load**: Kiểm tra trong DevTools > Network > CSS files
2. **JS error**: Xem Console tab có lỗi đỏ không
3. **Backend không chạy**: API calls sẽ fail
4. **CORS error**: Backend chưa allow frontend origin

### Cách fix:

#### Nếu CSS không load:
```bash
# Restart dev server
npm run dev
```

#### Nếu có JS error:
- ErrorBoundary sẽ hiển thị lỗi đỏ với stack trace
- Gửi screenshot cho tôi

#### Nếu CORS error:
Thêm vào backend Spring Boot:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3001")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## 📱 Thử nghiệm:

### 1. Mở test page:
```
http://localhost:3001/test
```
Nếu thấy chữ "Test Page - Giao diện hoạt động!" thì React OK

### 2. Mở login page:
```
http://localhost:3001/login
```
Nếu thấy background vũ trụ màu xanh đen với ngôi sao thì CSS OK

### 3. Kiểm tra form:
- Có thấy 2 ô input (username, password) không?
- Có thấy nút "Đăng nhập" không?
- Có thấy link "Đăng ký ngay" không?

## 🚨 Nếu vẫn lỗi:

Chụp màn hình:
1. Toàn bộ trình duyệt (để thấy URL)
2. DevTools Console tab (F12)
3. DevTools Network tab (F12)

Và cho tôi biết bạn thấy gì!
