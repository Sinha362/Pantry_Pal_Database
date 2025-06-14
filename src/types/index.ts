export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  similarityScore: number;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
}

export interface FilterOptions {
  category: string;
}