import { createClient } from '@supabase/supabase-js';
import { Recipe, BookmarkedRecipe } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

// Bookmark functions
export const addBookmark = async (userId: string, recipe: Recipe): Promise<{ error: any; data?: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookmarked_recipes')
      .insert({
        user_id: userId,
        recipe_id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions],
        similarity_score: recipe.similarityScore
      });

    console.log('Supabase addBookmark response:', { data, error, userId, recipe });
    return { error, data };
  } catch (error) {
    console.log('Supabase addBookmark exception:', error);
    return { error };
  }
};

export const removeBookmark = async (userId: string, recipeId: string): Promise<{ error: any, data: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookmarked_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);

    console.log('Supabase removeBookmark response:', { data, error, userId, recipeId });
    return { error, data };
  } catch (error) {
    console.log('Supabase removeBookmark exception:', error);
    return { error, data: null };
  }
};

export const fetchBookmarkedRecipeIds = async (userId: string): Promise<{ data: string[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookmarked_recipes')
      .select('recipe_id')
      .eq('user_id', userId);

    console.log('Supabase fetchBookmarkedRecipeIds response:', { data, error, userId });

    if (error) {
      return { data: null, error };
    }

    // Ensure we return an array of trimmed strings
    const recipeIds = data?.map(item => String(item.recipe_id).trim()) || [];
    return { data: recipeIds, error: null };
  } catch (error) {
    console.log('Supabase fetchBookmarkedRecipeIds exception:', error);
    return { data: null, error };
  }
};

export const fetchBookmarkedRecipes = async (userId: string): Promise<{ data: BookmarkedRecipe[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookmarked_recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    console.log('Supabase fetchBookmarkedRecipes response:', { data, error, userId });
    return { data, error };
  } catch (error) {
    console.log('Supabase fetchBookmarkedRecipes exception:', error);
    return { data: null, error };
  }
};