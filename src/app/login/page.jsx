'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authUtils.login(email, password);

    if (result.success) {
      router.push('/items');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <Navigation />
      
      <div className="flex  items-center justify-center min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="card p-8 max-w-md flex flex-col mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            
            <div className="alert alert-info mb-4">
              <p className="text-sm">
                <strong>Demo:</strong> admin@example.com / 123456
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="/" className="link">← Back to home</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}