import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import FilterPanel from './components/FilterPanel';
import RecipeGrid from './components/RecipeGrid';
import { recipes } from './data/recipes';
import { filterRecipes } from './utils/recipeUtils';
import { FilterOptions } from './types';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    maxCookingTime: 120,
    difficulty: [],
  });

  const filteredRecipes = useMemo(() => {
    if (!showResults) return [];
    return filterRecipes(recipes, ingredients, filters);
  }, [ingredients, filters, showResults]);

  const handleGoClick = () => {
    setShowResults(true);
  };

  const handleIngredientsChange = (newIngredients: string[]) => {
    setIngredients(newIngredients);
    // Reset results when ingredients change
    if (showResults && newIngredients.length === 0) {
      setShowResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
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
        />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
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