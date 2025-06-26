import React, { useState } from 'react';
import { X, Tag, CheckCircle, AlertCircle, Target, Bookmark, BookmarkCheck } from 'lucide-react';
import { Recipe } from '../types';
import { getMissingIngredients } from '../utils/recipeUtils';

interface RecipeModalProps {
  recipe: Recipe;
  availableIngredients: string[];
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (recipe: Recipe, isBookmarked: boolean) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ 
  recipe, 
  availableIngredients, 
  onClose, 
  isBookmarked, 
  onBookmarkToggle 
}) => {
  const [imageError, setImageError] = useState(false);
  const missingIngredients = getMissingIngredients(recipe, availableIngredients);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/15 border-green-500/25';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/15 border-yellow-500/25';
    return 'text-red-400 bg-red-500/15 border-red-500/25';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBookmarkClick = () => {
    onBookmarkToggle(recipe, isBookmarked);
  };

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions.filter((step: string) => step.trim() !== '' && isNaN(Number(step.trim())) && !/^STEP \d+$/i.test(step.trim()))
    : recipe.instructions.split('\r\n').filter((step: string) => step.trim() !== '' && isNaN(Number(step.trim())) && !/^STEP \d+$/i.test(step.trim()));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/70 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkClick}
              className={`p-2 rounded-full transition-all duration-200 ${
                isBookmarked 
                  ? 'bg-yellow-500/80 text-white hover:bg-yellow-600/80 shadow-lg shadow-yellow-500/20' 
                  : 'bg-slate-700/40 text-slate-400 hover:bg-slate-600/40 hover:text-yellow-400'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/40 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              {recipe.image && !imageError ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  onError={handleImageError}
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-20 h-20 text-emerald-400 mx-auto mb-3" />
                    <p className="text-emerald-400 font-medium text-lg">{recipe.category}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{recipe.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{recipe.ingredients.length} ingredients</span>
                </div>
              </div>

              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSimilarityColor(recipe.similarityScore)}`}>
                    {recipe.similarityScore}% Similarity Match
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  This recipe matches {recipe.similarityScore}% of your available ingredients.
                </p>
              </div>

              {isBookmarked && (
                <div className="p-3 bg-yellow-500/15 border border-yellow-500/25 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-300">
                    <BookmarkCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">Recipe Bookmarked</span>
                  </div>
                  <p className="text-xs text-yellow-400 mt-1">
                    This recipe has been saved to your bookmarks
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const hasIngredient = availableIngredients.some(available => 
                    available.toLowerCase().includes(ingredient.toLowerCase()) ||
                    ingredient.toLowerCase().includes(available.toLowerCase())
                  );
                  
                  return (
                    <li key={index} className="flex items-center gap-2">
                      {hasIngredient ? (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      )}
                      <span className={`capitalize ${hasIngredient ? 'text-slate-300' : 'text-orange-400'}`}>
                        {ingredient}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {missingIngredients.length > 0 && (
                <div className="mt-4 p-3 bg-orange-500/15 border border-orange-500/25 rounded-lg">
                  <p className="font-medium text-orange-300 mb-1">Missing Ingredients:</p>
                  <p className="text-sm text-orange-400">
                    {missingIngredients.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
              {instructions.length > 0 ? (
                <ol className="space-y-4">
                  {instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{instruction}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-slate-500">No instructions available for this recipe.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;