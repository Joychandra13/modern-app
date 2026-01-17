'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  FiEdit3, 
  FiTrash2, 
  FiBook, 
  FiTarget, 
  FiArrowLeft,
  FiX,
  FiAlertCircle
} from 'react-icons/fi';

export default function ItemDetailsPage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the id from params
        const id = params.id;
        
        if (!id) {
          setError('Invalid topic ID');
          setLoading(false);
          return;
        }
        
        // Fetch item from API
        const response = await fetch(`/api/items/${id}`, {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Math topic not found');
          } else {
            setError('Failed to load math topic');
          }
          setLoading(false);
          return;
        }
        
        const itemData = await response.json();
        setItem(itemData);
        setIsLoggedIn(authUtils.isLoggedIn());
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        router.push('/items');
      } else {
        alert('Failed to delete item: ' + data.message);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="xl" text="Loading math topic..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <FiX className="text-4xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
            <p className="text-gray-600 mb-6">The math topic you're looking for doesn't exist or couldn't be loaded.</p>
            <Link href="/items" className="btn btn-primary">
              <FiArrowLeft className="inline mr-2" />
              Back to Math Topics
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FiAlertCircle className="text-4xl text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Topic not found</h2>
            <p className="text-gray-600 mb-6">The math topic you're looking for doesn't exist.</p>
            <Link href="/items" className="btn btn-primary">
              <FiArrowLeft className="inline mr-2" />
              Back to Math Topics
            </Link>
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
      <main className="container-md py-8">
        <div className="card p-8">
          {/* Admin controls for logged in users */}
          {isLoggedIn && (
            <div className="flex gap-2 mb-4 justify-end">
              <Link
                href={`/items/${item.id}/edit`}
                className="btn btn-secondary btn-sm"
              >
                <FiEdit3 className="inline mr-2" />
                Edit Topic
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-danger btn-sm"
              >
                {deleting ? (
                  <>
                    <LoadingSpinner size="sm" className="inline mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="inline mr-2" />
                    Delete Topic
                  </>
                )}
              </button>
            </div>
          )}

          {/* Image at top */}
          <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-8">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and badges */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            
            <div className="flex gap-3 mb-6">
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
                <FiBook className="inline mr-2" />
                {item.category}
              </span>
              <span className={`category-badge font-semibold ${
                item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                item.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                <FiTarget className="inline mr-2" />
                {item.difficulty}
              </span>
            </div>
          </div>

          {/* Content sections */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Mathematical Solutions & Examples</h2>
              <div className="math-solution">
                {item.detailedSolution || "Detailed mathematical solutions and step-by-step examples will be provided here."}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h3 className="font-bold">What You'll Learn:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Core concepts and fundamentals</li>
                <li>• Step-by-step problem solving</li>
                <li>• Real-world applications</li>
                <li>• Practice exercises and examples</li>
              </ul>
            </div>

            <div className="mt-6">
              <Link href="/items" className="link">
                <FiArrowLeft className="inline mr-2" />
                Back to Math Topics
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}