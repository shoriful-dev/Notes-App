# NotesApp — Modern Full-Stack Note-Taking Solution

A premium, fast, and secure note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). Features a beautiful, responsive UI with dark mode support, intelligent search, and organized tagging.

## 🚀 Features

- **Rich Note Management**: Create, edit, delete, and pin important notes.
- **Smart Organization**: Categorize notes with custom tags and color-coded priority levels.
- **Instant Search**: Lightning-fast search across titles and content using MongoDB Text Indexes.
- **Personalized Profile**: Update your profile picture and information directly from the dashboard.
- **Premium UI/UX**: 
  - Fully responsive design (Mobile, Tablet, Desktop).
  - Modern Dark Mode support.
  - Smooth animations with Framer Motion.
  - Glassmorphic headers and sidebar.
- **Performance Optimized**: 
  - Slashed bundle size by removing heavy dependencies like `moment`.
  - Memoized components and context for zero-lag interactions.
  - Optimized backend queries with strategic database indexing.
- **Secure Authentication**: Protected routes using JWT (JSON Web Tokens).

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Tailwind CSS 4** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Axios** (API Requests)
- **Context API** (State Management)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT & BcryptJS** (Security)
- **Multer** (Profile Image Uploads)
- **Nodemailer** (Email Services)

## 📦 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Notes-App
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the frontend:
```bash
npm run dev
```

## 📱 Responsiveness
The app is optimized for:
- **Mobile**: Compact stats, touch-friendly buttons, and a sliding drawer menu.
- **Tablet**: Balanced grid layouts and flexible sidebars.
- **Desktop**: Expansive 4-column note grid for maximum productivity.

## 📝 License
This project is licensed under the ISC License.

---
Built with ❤️ by [shoriful-dev](https://github.com/shoriful-dev)
