import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBook } from '../../api/booksApi';
import type { CreateBookDto } from '../../api/booksApi';

export default function CreateBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateBookDto>({ title: '', author: '', price: 0, categoryId: '', ratingId: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createBook(form);
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Add Book</h1>
        <Link to="/books" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" placeholder="Book title (3–50 chars)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} minLength={3} maxLength={50} required />
            </div>
            <div className="form-group">
              <label>Author <span className="required">*</span></label>
              <input type="text" placeholder="Author name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} minLength={1} maxLength={50} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price <span className="required">*</span></label>
              <input type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} min={0} max={100000} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category ID <span className="required">*</span></label>
              <input type="text" placeholder="UUID" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Rating ID <span className="required">*</span></label>
              <input type="text" placeholder="UUID" value={form.ratingId} onChange={(e) => setForm({ ...form, ratingId: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Optional description (max 1000 chars)" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={1000} rows={4} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Create Book'}</button>
            <Link to="/books" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
