/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
/* eslint-enable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import FilterPanel from './components/FilterPanel';
import RecipeGrid from './components/RecipeGrid';
import { FilterOptions, Recipe } from './types';
import { ChefHat, X } from 'lucide-react';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ category: '' });
  const [showHero, setShowHero] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHero(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const ingredientMatchRatio = (recipeIngredients: string[], userIngredients: string[]) => {
    const matched = recipeIngredients.filter(r =>
      userIngredients.some(u => r.toLowerCase().includes(u.toLowerCase()))
    ).length;
    return matched / recipeIngredients.length;
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
      <AnimatePresence>
        {showHero && (
          <motion.div
            key="hero"
            className="flex items-center justify-center flex-col h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-emerald-600 p-6 rounded-full mb-6"
            >
              <ChefHat className="w-16 h-16 text-white" />
            </motion.div>
            <motion.h1
              className="text-5xl font-bold"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Pantry Pal
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!showHero && (
        <>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
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
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </main>

          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-300">
                &copy; 2025 Pantry Pal. Make the most of what you have - no waste, no shopping trips!
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
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200 relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowOverlay(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <RecipeGrid
                    recipes={recipes}
                    availableIngredients={ingredients}
                    showResults={showResults}
                    loading={loading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
