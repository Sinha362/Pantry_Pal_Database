import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import FilterPanel from './components/FilterPanel';
import RecipeGrid from './components/RecipeGrid';
import { filterRecipes } from './utils/recipeUtils';
import { FilterOptions, Recipe } from './types';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
  });

  const filteredRecipes = useMemo(() => {
    if (!showResults) return [];
    return filterRecipes(recipes, ingredients, filters);
  }, [recipes, ingredients, filters, showResults]);

  const fetchRecipes = async (ingredientsList: string[]) => {
    if (ingredientsList.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const requestBody = {
        ingredients: ingredientsList,
        filters: filters.category ? { category: filters.category } : {}
      };

      console.log('Sending request to backend:', requestBody);

      const response = await fetch('https://Mlboy23-pantrypal-backend.hf.space/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response from backend:', data);

      // Handle the response structure - assuming the API returns recipes directly or in a recipes field
      const recipesData = Array.isArray(data) ? data : (data.results || []);
      
      // Map API response to our Recipe interface
      const mappedRecipes: Recipe[] = recipesData.map((recipe: any) => ({
        id: recipe.id || String(Math.random()),
        title: recipe.title || 'Untitled Recipe',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        category: recipe.category || 'Uncategorized',
        // Fix: Check for 'similarity' field and convert decimal to percentage
        similarityScore: typeof recipe.similarity === 'number' 
          ? Math.round(recipe.similarity * 100) // Convert 0.547 to 55%
          : typeof recipe.similarity_score === 'number' 
            ? recipe.similarity_score 
            : typeof recipe.similarityScore === 'number' 
              ? recipe.similarityScore 
              : 0,
        image: recipe.image || ''
      }));

      console.log('Mapped recipes with similarity scores:', mappedRecipes);
      setRecipes(mappedRecipes);
      
      if (mappedRecipes.length === 0) {
        setError('No recipes found for your ingredients and filters.');
      }
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
    // Re-fetch recipes when filters change if we're already showing results
    if (showResults && ingredients.length > 0) {
      fetchRecipes(ingredients);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-emerald-50">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <IngredientInput
          ingredients={ingredients}
          onIngredientsChange={handleIngredientsChange}
          onGoClick={handleGoClick}
          showResults={showResults}
        />

        {showResults && (
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <RecipeGrid
          recipes={filteredRecipes}
          availableIngredients={ingredients}
          showResults={showResults}
          loading={loading}
        />
      </main>

      {/* Sticky Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            &copy; 2025 Pantry Pal. Make the most of what you have - no waste, no shopping trips!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;