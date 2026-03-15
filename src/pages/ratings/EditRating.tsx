import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRatingById, updateRating } from '../../api/ratingsApi';

export default function EditRating() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ratingName, setRatingName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await getRatingById(id!);
        setRatingName(res.data.ratingName);
      } catch {
        setError('Failed to load rating.');
      } finally {
        setFetching(false);
      }
    };
    fetchRating();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateRating(id!, { ratingName });
      navigate('/ratings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update rating.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>✏️ Edit Rating</h1>
        <Link to="/ratings" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Rating Name <span className="required">*</span></label>
            <input type="text" value={ratingName} onChange={(e) => setRatingName(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Update Rating'}</button>
            <Link to="/ratings" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
