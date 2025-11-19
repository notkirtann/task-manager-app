# Task Manager App

A modern, full-featured task management application designed to help users organize, track, and complete their tasks efficiently.

## 🚀 Features

- **Task Creation & Management**: Create, edit, and delete tasks with ease
- **Priority Levels**: Assign priority levels (Low, Medium, High) to tasks
- **Due Dates**: Set deadlines and track task completion
- **Task Status**: Mark tasks as pending, in-progress, or completed
- **Search & Filter**: Quickly find tasks using search and filter options
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **User Authentication**: Secure login and user-specific task management
- **Dark/Light Theme**: Toggle between themes for comfortable viewing

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux/Redux Toolkit for state management
- CSS3/Styled Components
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed locally or MongoDB Atlas account

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/notkirtann/task-manager-app.git
cd task-manager-app
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📱 Usage

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your account using your credentials
3. **Create Tasks**: Click the "Add Task" button to create a new task
4. **Manage Tasks**: 
   - Edit tasks by clicking the edit icon
   - Mark tasks as complete by checking the checkbox
   - Delete tasks using the delete icon
5. **Filter Tasks**: Use the filter options to view tasks by status or priority
6. **Search**: Use the search bar to find specific tasks

## 🗂️ Project Structure

```
task-manager-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Task/
│   │   │   └── Layout/
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/complete` - Mark task as complete

## 🧪 Testing

Run tests using:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment (Heroku/Render)

1. Create a new app on your hosting platform
2. Add MongoDB connection string to environment variables
3. Deploy using Git or GitHub integration

### Frontend Deployment (Vercel/Netlify)

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**notkirtann**

- GitHub: [@notkirtann](https://github.com/notkirtann)

## 🙏 Acknowledgments

- Icons from [Font Awesome](https://fontawesome.com/)
- UI inspiration from modern task management apps
- Community contributors and testers

## 📞 Support

For support, email contactkirtann@gmail.com.com or open an issue in the GitHub repository.

---

**Happy Task Managing! ✅**
