import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook } from '../../api/booksApi';

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

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getBookById(id!);
        setBook(res.data);
      } catch {
        setError('Failed to load book.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this book?')) return;
    try {
      await deleteBook(id!);
      navigate('/books');
    } catch {
      alert('Failed to delete book.');
    }
  };

  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!book) return null;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📖 {book.title}</h1>
        <div className="header-actions">
          <Link to={`/books/${id}/edit`} className="btn btn-secondary">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <Link to="/books" className="btn btn-ghost">← Back</Link>
        </div>
      </div>
      <div className="detail-card">
        <div className="detail-row"><span className="label">Author</span><span>{book.author}</span></div>
        <div className="detail-row"><span className="label">Price</span><span>${book.price}</span></div>
        <div className="detail-row"><span className="label">Category</span><span>{book.category?.title ?? '—'}</span></div>
        <div className="detail-row"><span className="label">Rating</span><span>{book.rating?.ratingName ?? '—'}</span></div>
        {book.description && (
          <div className="detail-row detail-description">
            <span className="label">Description</span>
            <span>{book.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}
