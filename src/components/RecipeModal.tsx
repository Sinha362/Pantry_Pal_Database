import React from 'react';
import { X, Clock, Users, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Recipe } from '../types';
import { getMissingIngredients } from '../utils/recipeUtils';

interface RecipeModalProps {
  recipe: Recipe;
  availableIngredients: string[];
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, availableIngredients, onClose }) => {
  const missingIngredients = getMissingIngredients(recipe, availableIngredients);

  const getDietaryBadges = () => {
    const badges = [];
    if (recipe.dietaryInfo.vegetarian) badges.push('Vegetarian');
    if (recipe.dietaryInfo.vegan) badges.push('Vegan');
    if (recipe.dietaryInfo.glutenFree) badges.push('Gluten-Free');
    if (recipe.dietaryInfo.dairyFree) badges.push('Dairy-Free');
    if (recipe.dietaryInfo.nutFree) badges.push('Nut-Free');
    return badges;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
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
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">{recipe.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cookingTime} minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="font-semibold">{recipe.nutrition.calories}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="font-semibold">{recipe.nutrition.protein}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Carbs</p>
                  <p className="font-semibold">{recipe.nutrition.carbs}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fat</p>
                  <p className="font-semibold">{recipe.nutrition.fat}g</p>
                </div>
              </div>

              {getDietaryBadges().length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {getDietaryBadges().map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
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
                  <p className="font-medium text-orange-800 mb-1">Shopping List:</p>
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