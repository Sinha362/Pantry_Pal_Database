import { Recipe, FilterOptions } from '../types';

export const calculateMatchPercentage = (recipe: Recipe, availableIngredients: string[]): number => {
  if (recipe.ingredients.length === 0) return 0;
  
  const matchingIngredients = recipe.ingredients.filter(ingredient =>
    availableIngredients.some(available => 
      available.toLowerCase().includes(ingredient.toLowerCase()) ||
      ingredient.toLowerCase().includes(available.toLowerCase())
    )
  );
  
  return Math.round((matchingIngredients.length / recipe.ingredients.length) * 100);
};

export const filterRecipes = (recipes: Recipe[], availableIngredients: string[], filters: FilterOptions): Recipe[] => {
  if (availableIngredients.length === 0) return [];
  
  return recipes
    .filter(recipe => {
      // CRITICAL: Only show recipes where ALL ingredients are available
      const hasAllIngredients = recipe.ingredients.every(ingredient =>
        availableIngredients.some(available => 
          available.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(available.toLowerCase())
        )
      );
      
      if (!hasAllIngredients) return false;
      
      // Dietary filters
      if (filters.vegetarian && !recipe.dietaryInfo.vegetarian) return false;
      if (filters.vegan && !recipe.dietaryInfo.vegan) return false;
      if (filters.glutenFree && !recipe.dietaryInfo.glutenFree) return false;
      if (filters.dairyFree && !recipe.dietaryInfo.dairyFree) return false;
      if (filters.nutFree && !recipe.dietaryInfo.nutFree) return false;
      
      // Cooking time filter
      if (recipe.cookingTime > filters.maxCookingTime) return false;
      
      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) return false;
      
      return true;
    })
    .map(recipe => ({
      ...recipe,
      matchPercentage: 100 // Always 100% since we only show recipes with all ingredients
    }))
    .sort((a, b) => {
      // Sort by cooking time (fastest first), then by number of ingredients (simplest first)
      if (a.cookingTime !== b.cookingTime) {
        return a.cookingTime - b.cookingTime;
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