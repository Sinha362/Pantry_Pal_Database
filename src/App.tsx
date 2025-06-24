import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import PantryPalContent from './components/PantryPalContent';
import BookmarkedRecipesPage from './components/BookmarkedRecipesPage';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

interface AppContentProps {
  currentView: 'pantryPal' | 'bookmarkedRecipes';
  setCurrentView: (view: 'pantryPal' | 'bookmarkedRecipes') => void;
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

  if (!user) {
    return <AuthForm />;
  }

  return currentView === 'pantryPal' ? (
    <PantryPalContent
      setCurrentView={setCurrentView}
      onNavigateToBookmarks={() => setCurrentView('bookmarkedRecipes')}
    />
  ) : (
    <BookmarkedRecipesPage setCurrentView={setCurrentView} />
  );
};

function App() {
  const [currentView, setCurrentView] = useState<'pantryPal' | 'bookmarkedRecipes'>('pantryPal');

  return (
    <AuthProvider>
      <AppContent currentView={currentView} setCurrentView={setCurrentView} />
    </AuthProvider>
  );
}

export default App;