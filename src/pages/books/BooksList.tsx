import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../../api/booksApi';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  categoryId: string;
  ratingId: string;
  category?: { id: string; title: string };
  rating?: { id: string; ratingName: string };
}

export default function BooksList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ filterOn: '', filterQuery: '', sortBy: '', isAscending: true, pageNumber: 1, pageSize: 20 });

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getBooks(filters);
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert('Failed to delete book.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📖 Books</h1>
        <div className="header-actions">
          <Link to="/books/create" className="btn btn-primary">+ Add Book</Link>
          <Link to="/books/bulk" className="btn btn-secondary">Bulk Import</Link>
          <Link to="/books/recommend" className="btn btn-accent">✨ Recommend</Link>
        </div>
      </div>

      <div className="filters-bar">
        <select value={filters.filterOn} onChange={(e) => setFilters({ ...filters, filterOn: e.target.value })}>
          <option value="">Filter by…</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <input placeholder="Search query…" value={filters.filterQuery} onChange={(e) => setFilters({ ...filters, filterQuery: e.target.value })} />
        <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
          <option value="">Sort by…</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
        </select>
        <label className="checkbox-label">
          <input type="checkbox" checked={filters.isAscending} onChange={(e) => setFilters({ ...filters, isAscending: e.target.checked })} />
          Ascending
        </label>
        <button className="btn btn-secondary" onClick={fetchBooks}>Apply</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading">Loading books…</div>
      ) : books.length === 0 ? (
        <div className="empty-state">No books found. <Link to="/books/create">Add one!</Link></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td><Link to={`/books/${book.id}`}>{book.title}</Link></td>
                  <td>{book.author}</td>
                  <td>${book.price}</td>
                  <td>{book.category?.title ?? '—'}</td>
                  <td>{book.rating?.ratingName ?? '—'}</td>
                  <td className="actions-cell">
                    <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/books/${book.id}/edit`)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
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
