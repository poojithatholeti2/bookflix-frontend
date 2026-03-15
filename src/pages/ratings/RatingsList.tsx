import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRatings, deleteRating } from '../../api/ratingsApi';

interface Rating { id: string; ratingName: string; }

export default function RatingsList() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ filterOn: '', filterQuery: '', sortBy: '', isAscending: true, pageNumber: 1, pageSize: 20 });

  const fetchRatings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getRatings(filters);
      setRatings(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load ratings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRatings(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this rating?')) return;
    try {
      await deleteRating(id);
      setRatings((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert('Failed to delete rating.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>⭐ Ratings</h1>
        <div className="header-actions">
          <Link to="/ratings/create" className="btn btn-primary">+ Add Rating</Link>
        </div>
      </div>

      <div className="filters-bar">
        <input placeholder="Search query…" value={filters.filterQuery} onChange={(e) => setFilters({ ...filters, filterQuery: e.target.value })} />
        <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
          <option value="">Sort by…</option>
          <option value="ratingName">Rating Name</option>
        </select>
        <label className="checkbox-label">
          <input type="checkbox" checked={filters.isAscending} onChange={(e) => setFilters({ ...filters, isAscending: e.target.checked })} />
          Ascending
        </label>
        <button className="btn btn-secondary" onClick={fetchRatings}>Apply</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading">Loading ratings…</div>
      ) : ratings.length === 0 ? (
        <div className="empty-state">No ratings found. <Link to="/ratings/create">Add one!</Link></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Rating Name</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {ratings.map((r) => (
                <tr key={r.id}>
                  <td><Link to={`/ratings/${r.id}`}>{r.ratingName}</Link></td>
                  <td className="actions-cell">
                    <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/ratings/${r.id}/edit`)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
