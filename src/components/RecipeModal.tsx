import React, { useState } from 'react';
import { X, Tag, CheckCircle, AlertCircle, Target } from 'lucide-react';
import { Recipe } from '../types';
import { getMissingIngredients } from '../utils/recipeUtils';

interface RecipeModalProps {
  recipe: Recipe;
  availableIngredients: string[];
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, availableIngredients, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const missingIngredients = getMissingIngredients(recipe, availableIngredients);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              {recipe.image && !imageError ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  onError={handleImageError}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-20 h-20 text-emerald-600 mx-auto mb-3" />
                    <p className="text-emerald-700 font-medium text-lg">{recipe.category}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{recipe.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{recipe.ingredients.length} ingredients</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSimilarityColor(recipe.similarityScore)}`}>
                    {recipe.similarityScore}% Similarity Match
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  This recipe matches {recipe.similarityScore}% of your available ingredients.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const hasIngredient = availableIngredients.some(available => 
                    available.toLowerCase().includes(ingredient.toLowerCase()) ||
                    ingredient.toLowerCase().includes(available.toLowerCase())
                  );
                  
                  return (
                    <li key={index} className="flex items-center gap-2">
                      {hasIngredient ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      )}
                      <span className={`capitalize ${hasIngredient ? 'text-gray-800' : 'text-orange-600'}`}>
                        {ingredient}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {missingIngredients.length > 0 && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="font-medium text-orange-800 mb-1">Missing Ingredients:</p>
                  <p className="text-sm text-orange-700">
                    {missingIngredients.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white text-sm rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;