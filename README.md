# User Management Dashboard (React + TypeScript)

A modern User Management Dashboard built with React, TypeScript, and Vite that integrates with a FastAPI backend.  
Supports full CRUD operations with server-side pagination, search, authentication, and clean UI.

---

## 🚀 Features

- JWT Authentication (Login & Protected Routes)
- View Users (Server-side Pagination & Search)
- Create User
- Edit User
- Delete User with confirmation
- Reusable Pagination Component
- Toast notifications for API responses
- Modern UI with TailwindCSS

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Hot Toast
- Heroicons

### Backend (API)

- FastAPI
- SQLAlchemy
- JWT Authentication
- CORS enabled
- Server-side pagination & filtering

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/95027/react-python-server.git

# Navigate into project
cd react-python-server

# Install dependencies
npm install

# Start development server
npm run dev

```

## 🔐 Authentication Flow

- User logs in → receives JWT token

- Token stored in localStorage

- Axios interceptor attaches token to requests

- Protected routes accessible only when authenticated

## 🎨 UI Highlights

- Clean dashboard layout

- Active / Inactive status badges

- Loading & empty states

- Toast success and error messages

- Responsive and modern table design

## 👨‍💻 Author

**Sai Kumar**  
Full Stack Developer (Laravel | Node.js | React | FastAPI | Javascript)

🔗 GitHub: https://github.com/95027
