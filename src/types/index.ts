export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string | string[];
  category: string;
  similarityScore: number;
  image: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
}

export interface FilterOptions {
  category: string;
}