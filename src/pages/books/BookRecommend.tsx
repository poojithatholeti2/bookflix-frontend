import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recommendBooks } from '../../api/booksApi';
import type { RecommendationQueryDto } from '../../api/booksApi';

export default function BookRecommend() {
  const [form, setForm] = useState<RecommendationQueryDto>({ query: '', isExplanationNeeded: false });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await recommendBooks(form);
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>✨ Book Recommendations</h1>
        <Link to="/books" className="btn btn-ghost">← Back</Link>
      </div>
      <div className="form-card">
        <p className="hint-text">Describe what kind of book you're looking for and get AI-powered recommendations.</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Your Query <span className="required">*</span></label>
            <textarea
              placeholder="e.g. I want a thrilling sci-fi novel with a mystery subplot and strong female lead…"
              value={form.query ?? ''}
              onChange={(e) => setForm({ ...form, query: e.target.value })}
              rows={4}
              minLength={24}
              required
            />
            <span className="hint">Minimum 24 characters</span>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.isExplanationNeeded}
                onChange={(e) => setForm({ ...form, isExplanationNeeded: e.target.checked })}
              />
              Include explanations for each recommendation
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-accent" disabled={loading}>
              {loading ? 'Finding…' : '✨ Get Recommendations'}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="result-card">
          <h3>Recommendations</h3>
          <pre className="result-pre">{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {error && <div className="alert alert-error">{error}</div>}
    </div>
  );
}
