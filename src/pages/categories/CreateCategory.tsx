import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCategory } from '../../api/categoriesApi';

export default function CreateCategory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createCategory({ title });
      navigate('/categories');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Add Category</h1>
        <Link to="/categories" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input type="text" placeholder="Category title (3–50 chars)" value={title} onChange={(e) => setTitle(e.target.value)} minLength={3} maxLength={50} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Create Category'}</button>
            <Link to="/categories" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
