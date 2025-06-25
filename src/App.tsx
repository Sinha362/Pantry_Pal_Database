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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4"
          >
            <ChefHat className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600 text-lg">Loading Pantry Pal...</p>
        </motion.div>
      </div>
    );
  }

  // If user is not authenticated, show landing or auth based on current view
  if (!user) {
    if (currentView === 'auth') {
      return <AuthForm />;
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