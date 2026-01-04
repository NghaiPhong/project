import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className="flex bg-primary border-b-2 border-b-hover justify-center fixed w-[100%]">
        <li>
          <Link to="/"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
            href=""
          >
            Code<span className="text-accent">ded</span>
          </Link>
        </li>
        <li>
          <Link to="/learn"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
            href=""
          >
            Learn
          </Link>
        </li>
        <li>
          <Link to="/practice"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
            href=""
          >
            Practice
          </Link>
        </li>
        <li>
          <Link to="/leaderboard"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
            href=""
          >
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/blog"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
            href=""
          >
            Blog
          </Link>
        </li>
        <li>
          <Link to="/account"
            className="flex text-white p-4 text-l border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors ml-100"
            href=""
          >
            Account
          </Link>
        </li>
      </nav>
    </>
  )
}

export default Navbar