import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBulkBooks } from '../../api/booksApi';
import type { CreateBookDto } from '../../api/booksApi';

const emptyBook = (): CreateBookDto => ({ title: '', author: '', price: 0, categoryId: '', ratingId: '', description: '' });

export default function BulkCreateBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<CreateBookDto[]>([emptyBook()]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addRow = () => setBooks([...books, emptyBook()]);
  const removeRow = (i: number) => setBooks(books.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof CreateBookDto, value: string | number) => {
    const updated = [...books];
    (updated[i] as any)[field] = value;
    setBooks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createBulkBooks(books);
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Bulk import failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📦 Bulk Import Books</h1>
        <Link to="/books" className="btn btn-ghost">← Back</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="bulk-table-wrapper">
            <table className="data-table bulk-table">
              <thead>
                <tr>
                  <th>Title*</th>
                  <th>Author*</th>
                  <th>Price*</th>
                  <th>Category ID*</th>
                  <th>Rating ID*</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, i) => (
                  <tr key={i}>
                    <td><input value={book.title} onChange={(e) => update(i, 'title', e.target.value)} placeholder="Title" required minLength={3} maxLength={50} /></td>
                    <td><input value={book.author} onChange={(e) => update(i, 'author', e.target.value)} placeholder="Author" required /></td>
                    <td><input type="number" value={book.price} onChange={(e) => update(i, 'price', parseInt(e.target.value))} placeholder="0" min={0} required /></td>
                    <td><input value={book.categoryId} onChange={(e) => update(i, 'categoryId', e.target.value)} placeholder="UUID" required /></td>
                    <td><input value={book.ratingId} onChange={(e) => update(i, 'ratingId', e.target.value)} placeholder="UUID" required /></td>
                    <td><input value={book.description ?? ''} onChange={(e) => update(i, 'description', e.target.value)} placeholder="Optional" maxLength={1000} /></td>
                    <td>{books.length > 1 && <button type="button" className="btn btn-sm btn-danger" onClick={() => removeRow(i)}>✕</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={addRow}>+ Add Row</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Importing…' : `Import ${books.length} Book(s)`}</button>
            <Link to="/books" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
