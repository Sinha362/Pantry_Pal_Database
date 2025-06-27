import React, { useState, useEffect } from 'react';
import { ChefHat, Lightbulb, AlertTriangle } from 'lucide-react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import { useAuth } from '../context/AuthContext';
import { fetchBookmarkedRecipeIds, addBookmark, removeBookmark } from '../lib/supabase';

interface RecipeGridProps {
  recipes: Recipe[];
  availableIngredients: string[];
  loading?: boolean;
  showResults: boolean;
  bookmarkedRecipeIds?: string[];
  onBookmarkToggle?: (recipe: Recipe, isCurrentlyBookmarked: boolean) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, availableIngredients, loading, showResults, bookmarkedRecipeIds, onBookmarkToggle }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  // Use prop if provided, else internal state
  const [internalBookmarkedRecipeIds, setInternalBookmarkedRecipeIds] = useState<Set<string>>(new Set());
  const [bookmarkLoading, setBookmarkLoading] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const filteredRecipes = recipes.filter(recipe => recipe.similarityScore >= 50);

  // Fetch bookmarked recipe IDs only if prop is not provided
  useEffect(() => {
    if (bookmarkedRecipeIds) return;
    if (!user?.id) {
      setInternalBookmarkedRecipeIds(new Set());
      return;
    }
    const loadBookmarkedRecipes = async () => {
      try {
        const { data, error } = await fetchBookmarkedRecipeIds(user.id);
        if (error) {
          console.error('Error fetching bookmarked recipes:', error);
        } else if (data) {
          setInternalBookmarkedRecipeIds(new Set(data.map(id => String(id).trim())));
        }
      } catch (error) {
        console.error('Error fetching bookmarked recipes:', error);
      }
    };
    loadBookmarkedRecipes();
  }, [user?.id, recipes.map(r => r.id).join(","), bookmarkedRecipeIds]);

  const handleBookmarkToggle = async (recipe: Recipe, isCurrentlyBookmarked: boolean) => {
    if (onBookmarkToggle) {
      onBookmarkToggle(recipe, isCurrentlyBookmarked);
      return;
    }
    if (!user?.id) return;
    setBookmarkLoading(prev => new Set(prev).add(recipe.id));
    try {
      if (isCurrentlyBookmarked) {
        const { error } = await removeBookmark(user.id, String(recipe.id).trim());
        if (error) console.error('Error removing bookmark:', error);
      } else {
        const { error } = await addBookmark(user.id, recipe);
        if (error) console.error('Error adding bookmark:', error);
      }
      // Always reload bookmarks from DB after toggle if not using prop
      if (!bookmarkedRecipeIds) {
        const { data, error } = await fetchBookmarkedRecipeIds(user.id);
        if (error) {
          console.error('Error fetching bookmarked recipes:', error);
        } else if (data) {
          setInternalBookmarkedRecipeIds(new Set(data.map(id => String(id).trim())));
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setBookmarkLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(recipe.id);
        return newSet;
      });
    }
  };

  if (!showResults) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-emerald-500 mb-3 sm:mb-4"></div>
        <p className="text-slate-300 text-base sm:text-lg text-center px-4">Finding recipes for you...</p>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 text-center px-4">Searching our database for the best matches</p>
      </div>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 mx-4">
        <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-slate-300 mb-2">No recipes found</h3>
        <p className="text-slate-500 mb-3 sm:mb-4 text-sm sm:text-base px-4">
          {availableIngredients.length === 0 
            ? "Add some ingredients to see what you can make!"
            : "We couldn't find recipes that match your ingredients and filters."
          }
        </p>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 sm:p-4 max-w-md mx-auto">
          <p className="text-blue-300 text-sm font-medium mb-2">
            <strong>Tips:</strong>
          </p>
          <ul className="text-blue-400 text-xs sm:text-sm text-left space-y-1">
            <li>• Try adding more common ingredients</li>
            <li>• Remove category filters to see more results</li>
            <li>• Check your spelling</li>
          </ul>
        </div>
      </div>
    );
  }

  // Use prop if provided, else internal state
  const bookmarkSet = bookmarkedRecipeIds ? new Set(bookmarkedRecipeIds.map(id => String(id).trim())) : internalBookmarkedRecipeIds;

  return (
    <>
      <div className="mb-4 sm:mb-6 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
          <span>Recipe Matches ({filteredRecipes.length})</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          These recipes match your available ingredients. Sorted by similarity score.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {filteredRecipes.map((recipe) => {
          const isBookmarked = bookmarkSet.has(String(recipe.id).trim());
          const isLoading = bookmarkLoading.has(recipe.id);
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              availableIngredients={availableIngredients}
              onClick={() => setSelectedRecipe(recipe)}
              isBookmarked={isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
            />
          );
        })}
      </div>
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          availableIngredients={availableIngredients}
          onClose={() => setSelectedRecipe(null)}
          isBookmarked={bookmarkSet.has(String(selectedRecipe.id).trim())}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}
    </>
  );
};

export default RecipeGrid;