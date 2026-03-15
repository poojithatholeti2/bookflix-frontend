import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>📚 Welcome to BookFlix</h1>
          <p>Your all-in-one platform to discover, manage, and explore books.</p>
          {!isAuthenticated ? (
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-lg">Sign In</Link>
              <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/books" className="btn btn-primary btn-lg">Browse Books</Link>
              <Link to="/books/recommend" className="btn btn-accent btn-lg">✨ Get Recommendations</Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📖</div>
          <h3>Books</h3>
          <p>Browse, search, filter and manage your entire book catalogue.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏷️</div>
          <h3>Categories</h3>
          <p>Organise books by genre, topic, and custom categories.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Ratings</h3>
          <p>Define age ratings and content classifications for books.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>AI Recommendations</h3>
          <p>Describe what you want and get intelligent book recommendations.</p>
        </div>
      </div>
    </div>
  );
}
