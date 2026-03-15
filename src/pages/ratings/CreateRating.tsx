import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createRating } from '../../api/ratingsApi';

export default function CreateRating() {
  const navigate = useNavigate();
  const [ratingName, setRatingName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createRating({ ratingName });
      navigate('/ratings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create rating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Add Rating</h1>
        <Link to="/ratings" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Rating Name <span className="required">*</span></label>
            <input type="text" placeholder="e.g. PG-13, Adult, Children" value={ratingName} onChange={(e) => setRatingName(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Create Rating'}</button>
            <Link to="/ratings" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
