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
export const addBookmark = async (userId: string, recipe: Recipe): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
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

    return { error };
  } catch (error) {
    return { error };
  }
};

export const removeBookmark = async (userId: string, recipeId: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('bookmarked_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);

    return { error };
  } catch (error) {
    return { error };
  }
};

export const fetchBookmarkedRecipeIds = async (userId: string): Promise<{ data: string[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookmarked_recipes')
      .select('recipe_id')
      .eq('user_id', userId);

    if (error) {
      return { data: null, error };
    }

    const recipeIds = data?.map(item => item.recipe_id) || [];
    return { data: recipeIds, error: null };
  } catch (error) {
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

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};