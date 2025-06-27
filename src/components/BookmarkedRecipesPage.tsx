import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchBookmarkedRecipes } from '../lib/supabase';
import { Recipe, BookmarkedRecipe } from '../types';
import RecipeGrid from './RecipeGrid';
import { Heart, ArrowLeft } from 'lucide-react';

interface BookmarkedRecipesPageProps {
  setCurrentView: (view: 'pantryPal' | 'bookmarkedRecipes') => void;
}

const convertToRecipe = (bookmark: BookmarkedRecipe): Recipe => ({
  id: bookmark.recipe_id,
  title: bookmark.title,
  ingredients: bookmark.ingredients,
  instructions: bookmark.instructions,
  category: bookmark.category || '',
  similarityScore: bookmark.similarity_score,
  image: bookmark.image || '',
  isBookmarked: true,
});

const BookmarkedRecipesPage: React.FC<BookmarkedRecipesPageProps> = ({ setCurrentView }) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      const { data, error } = await fetchBookmarkedRecipes(user.id);
      if (error) {
        setError('Failed to fetch bookmarked recipes.');
        setRecipes([]);
      } else if (data) {
        setRecipes(data.map(convertToRecipe));
      }
      setLoading(false);
    };
    fetchBookmarks();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-violet-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-36 sm:w-72 h-36 sm:h-72 bg-pink-500/6 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <button
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors order-1 sm:order-none"
            onClick={() => setCurrentView('pantryPal')}
            aria-label="Back to Pantry Pal"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Pantry Pal</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center text-white order-2 sm:order-none flex-1 sm:flex-none">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mr-2" />
            <span className="hidden xs:inline">Bookmarked Recipes</span>
            <span className="xs:hidden">Bookmarks</span>
          </h1>
          <div className="w-32 hidden sm:block" /> {/* Spacer for alignment */}
        </div>
        {error && <p className="text-center text-red-400 mb-4 text-sm sm:text-base px-4">{error}</p>}
        <RecipeGrid
          recipes={recipes}
          availableIngredients={[]}
          loading={loading}
          showResults={true}
          bookmarkedRecipeIds={recipes.map(r => r.id)}
        />
      </div>
    </div>
  );
};

export default BookmarkedRecipesPage;