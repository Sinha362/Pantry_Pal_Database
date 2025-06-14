import React from 'react';
import { Star, CheckCircle, Target } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  availableIngredients: string[];
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, availableIngredients, onClick }) => {
  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 80) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Partial Match';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border-2 border-emerald-100"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
          <div className="text-center">
            <Target className="w-16 h-16 text-emerald-600 mx-auto mb-2" />
            <p className="text-emerald-700 font-medium">{recipe.category}</p>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getSimilarityColor(recipe.similarityScore)}`}>
            <CheckCircle className="w-3 h-3" />
            {getSimilarityLabel(recipe.similarityScore)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {recipe.similarityScore}% Match
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{recipe.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{recipe.ingredients.length} ingredients</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Similarity: {recipe.similarityScore}%</span>
          </div>
          <div className="text-xs text-emerald-600">
            <strong>Ingredients needed:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
            {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;