import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        if (session) {
          console.log('User logged in:', session.user);
        } else {
          console.log('User logged out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const switchToSignUp = () => {
    setCurrentPage('signup');
  };

  const switchToLogin = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="App">
        <Dashboard onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUp onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}

export default App;
