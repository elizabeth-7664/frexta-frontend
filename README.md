# Frexta Frontend

Frexta is a full-stack client management app that helps users organize clients, projects, notes, and payments — all from a single dashboard. This is the **frontend** built using React and Tailwind CSS.

## 🚀 Features

- 🔐 User Authentication (Login, Register, Forgot Password)
- 🧑 Clients List & Details
- 📁 Project Tracking
- 📝 Notes for each Client (CRUD)
- ⚙️ Settings Page (placeholder)
- 🔒 Protected Routes with React Router
- 🌈 TailwindCSS for styling
- 🌐 Axios for API requests

## 📂 Project Structure

```bash
src/
│
├── components/          # Navbar, ProtectedRoute
├── context/             # AuthContext for managing login state
├── pages/               # Login, Register, Dashboard, Clients, Notes etc.
├── utils/               # Axios config (api.js)
├── App.jsx              # Main routing and layout
└── main.jsx             # App entry point

🛠️ Tech Stack

    React

    TailwindCSS

    Vite

    React Router

    Axios

    PostgreSQL & FastAPI Backend (link if available)

📦 Setup Instructions

    Clone the repo

git clone https://github.com/elizabeth-7664/frexta-frontend.git
cd frexta-frontend

Install dependencies

npm install

Start the dev server

npm run dev

Environment Variables

Create a .env file with your backend API base URL:

    VITE_API_BASE_URL=http://localhost:8000/api

✅ To-Do

Connect to the backend

Add Payments page

Implement real Settings logic

    Form validations & loading states

