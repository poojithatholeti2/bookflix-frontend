import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../api/categoriesApi';

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await getCategoryById(id!);
        setTitle(res.data.title);
      } catch {
        setError('Failed to load category.');
      } finally {
        setFetching(false);
      }
    };
    fetchCat();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateCategory(id!, { title });
      navigate('/categories');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update category.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>✏️ Edit Category</h1>
        <Link to="/categories" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} minLength={3} maxLength={50} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Update Category'}</button>
            <Link to="/categories" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
