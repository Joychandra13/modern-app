// Vercel-compatible authentication utilities
export const authUtils = {
  // Login function
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth state in localStorage for client-side checks
        localStorage.setItem('modernapp-auth', 'true');
        localStorage.setItem('modernapp-user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  },

  // Logout function
  logout() {
    localStorage.removeItem('modernapp-auth');
    localStorage.removeItem('modernapp-user');
    window.location.href = '/login';
  },

  // Check if user is logged in
  isLoggedIn() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('modernapp-auth') === 'true';
  },

  // Get current user
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('modernapp-user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }
};