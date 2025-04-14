import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App
