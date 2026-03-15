import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, updateBook } from '../../api/booksApi';
import type { UpdateBookDto } from '../../api/booksApi';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<UpdateBookDto>({ title: '', author: '', price: 0, categoryId: '', ratingId: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBookById(id!);
        const b = res.data;
        setForm({ title: b.title, author: b.author, price: b.price, categoryId: b.categoryId, ratingId: b.ratingId, description: b.description ?? '' });
      } catch {
        setError('Failed to load book data.');
      } finally {
        setFetching(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateBook(id!, form);
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update book.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading…</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>✏️ Edit Book</h1>
        <Link to="/books" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} minLength={3} maxLength={50} required />
            </div>
            <div className="form-group">
              <label>Author <span className="required">*</span></label>
              <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} minLength={1} maxLength={50} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price <span className="required">*</span></label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} min={0} max={100000} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category ID <span className="required">*</span></label>
              <input type="text" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Rating ID <span className="required">*</span></label>
              <input type="text" value={form.ratingId} onChange={(e) => setForm({ ...form, ratingId: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={1000} rows={4} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Update Book'}</button>
            <Link to="/books" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
