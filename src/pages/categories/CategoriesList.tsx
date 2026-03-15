import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../api/categoriesApi';

interface Category { id: string; title: string; }

export default function CategoriesList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ filterOn: '', filterQuery: '', sortBy: '', isAscending: true, pageNumber: 1, pageSize: 20 });

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getCategories(filters);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Failed to delete category.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🏷️ Categories</h1>
        <div className="header-actions">
          <Link to="/categories/create" className="btn btn-primary">+ Add Category</Link>
        </div>
      </div>

      <div className="filters-bar">
        <input placeholder="Search query…" value={filters.filterQuery} onChange={(e) => setFilters({ ...filters, filterQuery: e.target.value })} />
        <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
          <option value="">Sort by…</option>
          <option value="title">Title</option>
        </select>
        <label className="checkbox-label">
          <input type="checkbox" checked={filters.isAscending} onChange={(e) => setFilters({ ...filters, isAscending: e.target.checked })} />
          Ascending
        </label>
        <button className="btn btn-secondary" onClick={fetchCategories}>Apply</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading">Loading categories…</div>
      ) : categories.length === 0 ? (
        <div className="empty-state">No categories found. <Link to="/categories/create">Add one!</Link></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td><Link to={`/categories/${cat.id}`}>{cat.title}</Link></td>
                  <td className="actions-cell">
                    <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/categories/${cat.id}/edit`)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
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
