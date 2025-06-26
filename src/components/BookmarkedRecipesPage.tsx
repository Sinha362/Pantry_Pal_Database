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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            onClick={() => setCurrentView('pantryPal')}
            aria-label="Back to Pantry Pal"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pantry Pal
          </button>
          <h1 className="text-3xl font-bold text-center flex items-center justify-center text-white">
            <Heart className="w-8 h-8 text-red-400 mr-2" />
            Bookmarked Recipes
          </h1>
          <div className="w-32" /> {/* Spacer for alignment */}
        </div>
        {error && <p className="text-center text-red-400 mb-4">{error}</p>}
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