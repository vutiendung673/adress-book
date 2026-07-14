# Sổ Địa Chỉ — FER202 (Create React App)

Ứng dụng Quản lý Sổ địa chỉ cá nhân, xây dựng bằng **Create React App** (react-scripts) +
**JSON Server** làm REST API backend.

## Kiến thức FER202 đã áp dụng
- JSX, Component, Props
- Hooks: `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`
- Context API (`ContactContext` quản lý danh bạ, `ThemeContext` chế độ sáng/tối)
- Custom Hooks: `useContacts`, `useDebounce`, `useTheme`
- `React.memo` (tối ưu re-render `ContactCard`)
- Class Component + lifecycle (`ErrorBoundary`)
- `react-router-dom` (routing 4 trang: danh sách, thêm, sửa, chi tiết)
- **Axios** gọi REST API
- **JSON Server** — backend REST API bắt buộc (`db.json`)
- Formik + Yup — validate form
- React Toastify — thông báo
- PropTypes — kiểm tra kiểu props
- Phân trang, sắp xếp, tìm kiếm (debounce)

## Cấu trúc thư mục (chuẩn Create React App)
```
address-book-cra/
├── public/
│   └── index.html
├── src/
│   ├── api/contactApi.js
│   ├── context/
│   │   ├── ContactContext.js
│   │   └── ThemeContext.js
│   ├── hooks/
│   │   ├── useContacts.js
│   │   ├── useDebounce.js
│   │   └── useTheme.js
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ThemeToggle.js
│   │   ├── ContactCard.js
│   │   ├── ContactForm.js
│   │   ├── Pagination.js
│   │   └── ErrorBoundary.js
│   ├── pages/
│   │   ├── ContactList.js
│   │   ├── ContactAdd.js
│   │   ├── ContactEdit.js
│   │   └── ContactDetail.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── db.json
└── package.json
```

## Cài đặt

```bash
cd address-book-cra
npm install
```

## Chạy dự án (2 lệnh tách riêng — 2 terminal)

**Terminal 1 — JSON Server (backend, cổng 3001):**
```bash
npm run server
```

**Terminal 2 — React app (frontend, Create React App tự chạy cổng 3000):**
```bash
npm start
```

Mở tại: http://localhost:3000

> Lưu ý: `npm start` ở đây là lệnh gốc của Create React App (`react-scripts start`), không phải
> lệnh gộp — nó chỉ chạy phần frontend. JSON Server vẫn phải chạy riêng ở terminal khác.

## API endpoints (json-server tự sinh từ db.json)

| Method | Endpoint       | Chức năng             |
|--------|----------------|------------------------|
| GET    | /contacts       | Lấy danh sách liên hệ  |
| GET    | /contacts/:id   | Lấy chi tiết 1 liên hệ |
| POST   | /contacts       | Thêm liên hệ mới       |
| PUT    | /contacts/:id   | Cập nhật liên hệ       |
| DELETE | /contacts/:id   | Xóa liên hệ            |
