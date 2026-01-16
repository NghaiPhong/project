import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './pages/index.jsx'
import Practice from './pages/practice.jsx'
import Course from './pages/course.jsx'
import Learn from './pages/learn.jsx'
import Lesson from './pages/lesson.jsx'
import Leaderboard from './pages/leaderboard.jsx'
import Blog from './pages/blog.jsx'
import Account from './pages/account.jsx'
import Navbar from './components/navbar.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.js'

function App(){
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setUser(user);
    })
  })

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/lesson/:id/:lid" element={<Lesson />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </Router>
  )
}

export default App