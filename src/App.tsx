import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import PantryPalContent from './components/PantryPalContent';
import BookmarkedRecipesPage from './components/BookmarkedRecipesPage';
import LandingPage from './components/LandingPage';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

interface AppContentProps {
  currentView: 'landing' | 'auth' | 'pantryPal' | 'bookmarkedRecipes';
  setCurrentView: (view: 'landing' | 'auth' | 'pantryPal' | 'bookmarkedRecipes') => void;
}

const AppContent: React.FC<AppContentProps> = ({ currentView, setCurrentView }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg shadow-emerald-500/25"
          >
            <ChefHat className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-slate-300 text-lg">Loading Pantry Pal...</p>
        </motion.div>
      </div>
    );
  }

  // If user is not authenticated, show landing or auth based on current view
  if (!user) {
    if (currentView === 'auth') {
      return <AuthForm onBack={() => setCurrentView('landing')} />;
    }
    return (
      <LandingPage
        onGetStarted={() => setCurrentView('auth')}
        onAuthClick={() => setCurrentView('auth')}
      />
    );
  }

  // If user is authenticated, show the appropriate view
  if (currentView === 'bookmarkedRecipes') {
    return <BookmarkedRecipesPage setCurrentView={setCurrentView} />;
  }

  return (
    <PantryPalContent
      setCurrentView={setCurrentView}
      onNavigateToBookmarks={() => setCurrentView('bookmarkedRecipes')}
    />
  );
};

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'pantryPal' | 'bookmarkedRecipes'>('landing');

  return (
    <AuthProvider>
      <AppContent currentView={currentView} setCurrentView={setCurrentView} />
    </AuthProvider>
  );
}

export default App;