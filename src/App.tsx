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
    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch('/api/recipes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ingredients: ingredientsList }),
      // });
      // const data = await response.json();
      // setRecipes(data.recipes || []);
      
      // Placeholder for API integration - remove this when implementing real API
      console.log('API call would be made with ingredients:', ingredientsList);
      setRecipes([]); // Empty array until API is connected
    } catch (error) {
      console.error('Error fetching recipes:', error);
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
            onFiltersChange={setFilters}
          />
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