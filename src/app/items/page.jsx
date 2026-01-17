'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  FiEdit3, 
  FiTrash2, 
  FiPlus,
  FiLogIn,
  FiAlertCircle
} from 'react-icons/fi';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    // Check authentication state
    setIsLoggedIn(authUtils.isLoggedIn());
    
    // Fetch items
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items', {
        cache: 'no-store'
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove item from local state
        setItems(items.filter(item => item.id !== id));
      } else {
        alert('Failed to delete item: ' + data.message);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="xl" text="Loading math topics..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />

      {/* Items List */}
      <main className="container py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">Math Topics</h1>
            <p className="text-xl text-gray-600">Explore our comprehensive mathematics curriculum</p>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <FiAlertCircle className="text-4xl text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No math topics found</h2>
              <p className="text-gray-600 mb-6">Start by adding your first math topic to the collection</p>
              {isLoggedIn ? (
                <Link href="/add-item" className="btn btn-primary btn-lg">
                  <FiPlus className="inline mr-2" />
                  Add First Topic
                </Link>
              ) : (
                <Link href="/login" className="btn btn-primary btn-lg">
                  <FiLogIn className="inline mr-2" />
                  Login to Add Topics
                </Link>
              )}
            </div>
          ) : (
            <div className="grid-items" >
              {items.map((item) => {
                // Difficulty colors
                const difficultyColors = {
                  'Beginner': 'bg-green-100 text-green-800',
                  'Intermediate': 'bg-yellow-100 text-yellow-800', 
                  'Advanced': 'bg-red-100 text-red-800',
                  'Expert': 'bg-purple-100 text-purple-800'
                };

                return (
                  <div key={item.id} className="card card-hover p-6 group relative">
                    {/* Admin controls for logged in users */}
                    {isLoggedIn && (
                      <div className="absolute top-2 left-2 admin-controls z-10">
                        <Link
                          href={`/items/${item.id}/edit`}
                          className="admin-btn admin-btn-edit"
                          title="Edit topic"
                        >
                          <FiEdit3 />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(item.id, item.name);
                          }}
                          disabled={deletingId === item.id}
                          className="admin-btn admin-btn-delete disabled:opacity-50"
                          title="Delete topic"
                        >
                          {deletingId === item.id ? <LoadingSpinner size="sm" /> : <FiTrash2 />}
                        </button>
                      </div>
                    )}

                    <Link href={`/items/${item.id}`} className="block">
                      <div className="relative overflow-hidden rounded-2xl mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`${difficultyColors[item.difficulty]} text-xs font-bold px-2 py-1 rounded-full`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-bold text-xl text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`category-badge ${
                            item.category === 'Algebra' ? 'category-algebra' :
                            item.category === 'Calculus' ? 'category-calculus' :
                            item.category === 'Geometry' ? 'category-geometry' :
                            item.category === 'Statistics' ? 'category-statistics' :
                            item.category === 'Trigonometry' ? 'category-trigonometry' :
                            item.category === 'Number Theory' ? 'category-number-theory' :
                            item.category === 'Logic' ? 'category-logic' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}