import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">📚 BookFlix</NavLink>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>

      <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        {isAuthenticated ? (
          <>
            <li className="nav-group-label">Books</li>
            <li><NavLink to="/books" className={navLinkClass}>📖 All Books</NavLink></li>
            <li><NavLink to="/books/create" className={navLinkClass}>➕ Add Book</NavLink></li>
            <li><NavLink to="/books/bulk" className={navLinkClass}>📦 Bulk Import</NavLink></li>
            <li><NavLink to="/books/recommend" className={navLinkClass}>✨ Recommend</NavLink></li>

            <li className="nav-divider" />
            <li className="nav-group-label">Categories</li>
            <li><NavLink to="/categories" className={navLinkClass}>🏷️ All Categories</NavLink></li>
            <li><NavLink to="/categories/create" className={navLinkClass}>➕ Add Category</NavLink></li>

            <li className="nav-divider" />
            <li className="nav-group-label">Ratings</li>
            <li><NavLink to="/ratings" className={navLinkClass}>⭐ All Ratings</NavLink></li>
            <li><NavLink to="/ratings/create" className={navLinkClass}>➕ Add Rating</NavLink></li>

            <li className="nav-divider" />
            <li>
              <button className="btn btn-ghost nav-logout" onClick={handleLogout}>🚪 Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={navLinkClass}>Sign In</NavLink></li>
            <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}
