import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Index from './pages/index.jsx'
import Learn from './pages/learn.jsx'
import Practice from './pages/practice.jsx'
import Leaderboard from './pages/leaderboard.jsx'
import Blog from './pages/blog.jsx'
import Account from './pages/account.jsx'
import Navbar from './components/navbar.jsx'

console.log("hello")

createRoot(document.getElementById('root')).render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  </Router>
)