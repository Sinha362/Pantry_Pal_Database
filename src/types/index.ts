export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string | string[];
  category: string;
  similarityScore: number;
  image: string;
  isBookmarked?: boolean;
}

export interface BookmarkedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  title: string;
  image: string | null;
  category: string | null;
  ingredients: string[];
  instructions: string[];
  similarity_score: number;
  created_at: string;
  updated_at: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
}

export interface FilterOptions {
  category: string;
}