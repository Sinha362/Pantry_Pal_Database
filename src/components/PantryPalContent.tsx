import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, User } from 'lucide-react';
import Header from './Header';
import IngredientInput from './IngredientInput';
import FilterPanel from './FilterPanel';
import RecipeGrid from './RecipeGrid';
import { FilterOptions, Recipe } from '../types';
import { useAuth } from '../context/AuthContext';
import { fetchBookmarkedRecipeIds, addBookmark, removeBookmark } from '../lib/supabase';

interface PantryPalContentProps {
  setCurrentView: (view: 'pantryPal' | 'bookmarkedRecipes') => void;
  onNavigateToBookmarks?: () => void;
}

const PantryPalContent: React.FC<PantryPalContentProps> = ({ setCurrentView, onNavigateToBookmarks }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ category: '' });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [bookmarkedRecipeIds, setBookmarkedRecipeIds] = useState<string[]>([]);

  const { user, profile, signOut } = useAuth();

  const ingredientMatchRatio = (recipeIngredients: string[], userIngredients: string[]) => {
    const matched = recipeIngredients.filter(r =>
      userIngredients.some(u => r.toLowerCase().includes(u.toLowerCase()))
    ).length;
    return matched / recipeIngredients.length;
  };

  // Fetch bookmarks for the user
  const fetchBookmarks = async (userId: string) => {
    if (!userId) return;
    try {
      const { data, error } = await fetchBookmarkedRecipeIds(userId);
      if (!error && data) {
        setBookmarkedRecipeIds(data);
      } else {
        setBookmarkedRecipeIds([]);
      }
    } catch (err) {
      setBookmarkedRecipeIds([]);
    }
  };

  // Fetch bookmarks on login
  useEffect(() => {
    if (user?.id) {
      fetchBookmarks(user.id);
    } else {
      setBookmarkedRecipeIds([]);
    }
  }, [user]);

  const fetchRecipes = async (ingredientsList: string[], updatedFilters: FilterOptions = filters) => {
    if (ingredientsList.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        ingredients: ingredientsList,
        filters: updatedFilters.category ? { category: updatedFilters.category } : {},
      };

      console.log('Sending request to backend:', requestBody);

      const response = await fetch('https://Mlboy23-pantrypal-backend.hf.space/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log('Received response from backend:', data);

      const recipesData = Array.isArray(data) ? data : data.results || [];

      const mappedRecipes: Recipe[] = recipesData.map((recipe: any) => ({
        id: recipe.id || String(Math.random()),
        title: recipe.title || 'Untitled Recipe',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: typeof recipe.instructions === 'string' ? recipe.instructions.split('\r\n') : recipe.instructions,
        category: recipe.category || 'Uncategorized',
        similarityScore: typeof recipe.similarity === 'number'
          ? Math.round(recipe.similarity * 100)
          : recipe.similarity_score || recipe.similarityScore || 0,
        image: recipe.image || ''
      }));

      const filteredByMatch = mappedRecipes.filter(r => ingredientMatchRatio(r.ingredients, ingredientsList) >= 0.35);

      setRecipes(filteredByMatch);
      setShowOverlay(true);
      if (filteredByMatch.length === 0) setError('No recipes found with sufficient ingredient matches.');
      // Fetch bookmarks after recipes are fetched
      if (user?.id) fetchBookmarks(user.id);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoClick = () => {
    setShowResults(true);
    fetchRecipes(ingredients);
  };

  const handleIngredientsChange = (newIngredients: string[]) => {
    setIngredients(newIngredients);
    if (showResults && newIngredients.length === 0) {
      setShowResults(false);
      setRecipes([]);
      setError(null);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    if (showResults && ingredients.length > 0) {
      fetchRecipes(ingredients, newFilters);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  // Add bookmark toggle handler
  const handleBookmarkToggle = async (recipe: Recipe, isCurrentlyBookmarked: boolean) => {
    if (!user?.id) return;
    if (isCurrentlyBookmarked) {
      await removeBookmark(user.id, String(recipe.id).trim());
    } else {
      await addBookmark(user.id, recipe);
    }
    // Always fetch the latest bookmarks from backend after toggle
    fetchBookmarks(user.id);
  };

  useEffect(() => {
    if (!user) {
      setShowUserMenu(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* User Menu */}
      <div className="absolute top-4 right-4 z-40">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="bg-slate-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg shadow-slate-900/50 hover:shadow-xl transition-all duration-200 border border-slate-700/50 hover:border-emerald-500/50"
          >
            <User className="w-5 h-5 text-emerald-400" />
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 py-2"
              >
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="text-sm font-medium text-white">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <button
                  onClick={onNavigateToBookmarks}
                  className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors border-b border-slate-700/50"
                >
                  <User className="w-4 h-4" />
                  My Bookmarks
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
        >
          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
            onGoClick={handleGoClick}
            showResults={showResults}
          />
        </motion.div>

        {ingredients.length > 0 && (
          <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-300 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-300">{error}</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-8 border-t border-slate-700/50 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            &copy; 2025 Pantry Pal. Make the Most of What You Have – Smarter Meals, Less Waste!
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4"
          >
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 relative">
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                onClick={() => setShowOverlay(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <RecipeGrid
                recipes={recipes}
                availableIngredients={ingredients}
                showResults={showResults}
                loading={loading}
                bookmarkedRecipeIds={bookmarkedRecipeIds}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default PantryPalContent;