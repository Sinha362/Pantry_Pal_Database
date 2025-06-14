import React, { useState } from 'react';
import { ChefHat, Lightbulb, AlertTriangle } from 'lucide-react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

interface RecipeGridProps {
  recipes: Recipe[];
  availableIngredients: string[];
  loading?: boolean;
  showResults: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, availableIngredients, loading, showResults }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (!showResults) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Finding recipes for you...</p>
        <p className="text-gray-500 text-sm mt-2">Searching our database for the best matches</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
        <p className="text-gray-500 mb-4">
          {availableIngredients.length === 0 
            ? "Add some ingredients to see what you can make!"
            : "We couldn't find recipes that match your ingredients and filters."
          }
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            <strong>Tips:</strong>
          </p>
          <ul className="text-blue-700 text-sm mt-2 text-left">
            <li>• Try adding more common ingredients</li>
            <li>• Remove category filters to see more results</li>
            <li>• Check your spelling</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <ChefHat className="w-7 h-7 text-emerald-600" />
          Recipe Matches ({recipes.length})
        </h2>
        <p className="text-gray-600">
          These recipes match your available ingredients. Sorted by similarity score.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            availableIngredients={availableIngredients}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          availableIngredients={availableIngredients}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
};

export default RecipeGrid;