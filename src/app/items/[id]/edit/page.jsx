'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EditItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailedSolution: '',
    category: '',
    difficulty: 'Beginner',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    if (!authUtils.isLoggedIn()) {
      router.push('/login');
      return;
    }

    // Fetch item data
    fetchItem();
  }, [router, params.id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${params.id}`);
      if (response.ok) {
        const item = await response.json();
        setFormData({
          name: item.name || '',
          description: item.description || '',
          detailedSolution: item.detailedSolution || '',
          category: item.category || '',
          difficulty: item.difficulty || 'Beginner',
          image: item.image || ''
        });
      } else {
        setError('Failed to load item data');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/items/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/items/${params.id}`);
        }, 1500);
      } else {
        setError(data.message || 'Failed to update topic');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="xl" text="Loading topic data..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-green-500 mb-4 text-6xl">✓</div>
            <h2 className="text-2xl font-bold mb-2">Topic Updated Successfully!</h2>
            <p className="text-gray-600">Redirecting to topic page...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />

      {/* Main Content */}
      <main className="container-sm py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Math Topic</h1>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div>
              <label className="label">Topic Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter math topic name"
              />
            </div>

            <div>
              <label className="label">Description *</label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="input"
                placeholder="Enter topic description"
              />
            </div>

            <div>
              <label className="label">Detailed Mathematical Solution</label>
              <textarea
                name="detailedSolution"
                rows={8}
                value={formData.detailedSolution}
                onChange={handleChange}
                className="input"
                placeholder="Enter detailed mathematical solutions, formulas, and step-by-step examples..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Include formulas, examples, and step-by-step solutions. Use mathematical notation where appropriate.
              </p>
            </div>

            <div>
              <label className="label">Category *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select a category</option>
                <option value="Algebra">Algebra</option>
                <option value="Calculus">Calculus</option>
                <option value="Geometry">Geometry</option>
                <option value="Statistics">Statistics</option>
                <option value="Trigonometry">Trigonometry</option>
                <option value="Number Theory">Number Theory</option>
                <option value="Logic">Logic</option>
                <option value="Applied Math">Applied Math</option>
              </select>
            </div>

            <div>
              <label className="label">Difficulty Level *</label>
              <select
                name="difficulty"
                required
                value={formData.difficulty}
                onChange={handleChange}
                className="input"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com/image.jpg (optional)"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Updating...' : 'Update Topic'}
              </button>
              <Link href={`/items/${params.id}`} className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}