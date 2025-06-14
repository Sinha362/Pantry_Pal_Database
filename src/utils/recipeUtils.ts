import { Recipe, FilterOptions } from '../types';

export const filterRecipes = (recipes: Recipe[], availableIngredients: string[], filters: FilterOptions): Recipe[] => {
  if (availableIngredients.length === 0) return [];
  
  return recipes
    .filter(recipe => {
      // Category filter
      if (filters.category && filters.category !== '' && recipe.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by similarity score (highest first), then by number of ingredients (simplest first)
      if (a.similarityScore !== b.similarityScore) {
        return b.similarityScore - a.similarityScore;
      }
      return a.ingredients.length - b.ingredients.length;
    });
};

export const getMissingIngredients = (recipe: Recipe, availableIngredients: string[]): string[] => {
  return recipe.ingredients.filter(ingredient =>
    !availableIngredients.some(available => 
      available.toLowerCase().includes(ingredient.toLowerCase()) ||
      ingredient.toLowerCase().includes(available.toLowerCase())
    )
  );
};