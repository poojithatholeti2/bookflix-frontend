import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import BooksList from './pages/books/BooksList';
import BookDetail from './pages/books/BookDetail';
import CreateBook from './pages/books/CreateBook';
import EditBook from './pages/books/EditBook';
import BulkCreateBooks from './pages/books/BulkCreateBooks';
import BookRecommend from './pages/books/BookRecommend';

import CategoriesList from './pages/categories/CategoriesList';
import CreateCategory from './pages/categories/CreateCategory';
import EditCategory from './pages/categories/EditCategory';

import RatingsList from './pages/ratings/RatingsList';
import CreateRating from './pages/ratings/CreateRating';
import EditRating from './pages/ratings/EditRating';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Books */}
            <Route path="/books" element={<ProtectedRoute><BooksList /></ProtectedRoute>} />
            <Route path="/books/create" element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
            <Route path="/books/bulk" element={<ProtectedRoute><BulkCreateBooks /></ProtectedRoute>} />
            <Route path="/books/recommend" element={<ProtectedRoute><BookRecommend /></ProtectedRoute>} />
            <Route path="/books/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
            <Route path="/books/:id/edit" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />

            {/* Categories */}
            <Route path="/categories" element={<ProtectedRoute><CategoriesList /></ProtectedRoute>} />
            <Route path="/categories/create" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
            <Route path="/categories/:id/edit" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />

            {/* Ratings */}
            <Route path="/ratings" element={<ProtectedRoute><RatingsList /></ProtectedRoute>} />
            <Route path="/ratings/create" element={<ProtectedRoute><CreateRating /></ProtectedRoute>} />
            <Route path="/ratings/:id/edit" element={<ProtectedRoute><EditRating /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}


