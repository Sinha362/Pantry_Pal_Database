import React, { useState } from 'react';
import { Star, CheckCircle, Target, Bookmark, BookmarkCheck } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  availableIngredients: string[];
  onClick: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (recipe: Recipe, isBookmarked: boolean) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  availableIngredients, 
  onClick, 
  isBookmarked, 
  onBookmarkToggle 
}) => {
  const [imageError, setImageError] = useState(false);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/15 border-green-500/25';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/15 border-yellow-500/25';
    return 'text-red-400 bg-red-500/15 border-red-500/25';
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 80) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Partial Match';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle(recipe, isBookmarked);
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-800/30 backdrop-blur-md rounded-xl shadow-lg shadow-slate-900/40 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-slate-700/40 hover:border-emerald-500/30 relative group"
    >
      <div className="relative">
        {recipe.image && !imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center">
            <div className="text-center">
              <Target className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-medium text-sm sm:text-base">{recipe.category}</p>
            </div>
          </div>
        )}
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
            isBookmarked 
              ? 'bg-yellow-500/80 text-white shadow-lg shadow-yellow-500/20 hover:bg-yellow-600/80' 
              : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-yellow-400 shadow-md'
          }`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border backdrop-blur-sm ${getSimilarityColor(recipe.similarityScore)}`}>
            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden xs:inline">{getSimilarityLabel(recipe.similarityScore)}</span>
            <span className="xs:hidden">Match</span>
          </span>
        </div>
        
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/25 backdrop-blur-sm">
            {recipe.similarityScore}% Match
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">{recipe.title}</h3>
        
        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate max-w-[80px] sm:max-w-none">{recipe.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{recipe.ingredients.length} ingredients</span>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-lg p-2.5 sm:p-3">
          <div className="flex items-center gap-2 text-emerald-400 mb-1 sm:mb-2">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Similarity: {recipe.similarityScore}%</span>
          </div>
          <div className="text-xs text-emerald-300">
            <strong>Ingredients needed:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
            {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;