import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Simple Scrambled Eggs',
    description: 'Fluffy scrambled eggs - perfect when you just have eggs and butter',
    ingredients: ['eggs', 'butter'],
    instructions: [
      'Crack eggs into a bowl and whisk',
      'Heat butter in a non-stick pan over low heat',
      'Pour in eggs and gently stir with a spatula',
      'Keep stirring until eggs are creamy and set',
      'Season with salt if available'
    ],
    cookingTime: 5,
    servings: 1,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 280,
      protein: 18,
      carbs: 2,
      fat: 22
    },
    image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Quick', 'Breakfast', 'Simple']
  },
  {
    id: '2',
    name: 'Garlic Butter Rice',
    description: 'Aromatic rice cooked with garlic and butter - surprisingly satisfying',
    ingredients: ['rice', 'garlic', 'butter'],
    instructions: [
      'Cook rice according to package directions',
      'Mince garlic finely',
      'Heat butter in a pan and sauté garlic until fragrant',
      'Mix the garlic butter with cooked rice',
      'Serve hot'
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 320,
      protein: 6,
      carbs: 58,
      fat: 8
    },
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Simple', 'Comfort', 'Side']
  },
  {
    id: '3',
    name: 'Crispy Potato Slices',
    description: 'Thinly sliced potatoes pan-fried until golden and crispy',
    ingredients: ['potatoes', 'oil'],
    instructions: [
      'Wash and slice potatoes thinly (about 1/4 inch)',
      'Heat oil in a large pan over medium heat',
      'Arrange potato slices in a single layer',
      'Cook until golden brown on one side (5-7 minutes)',
      'Flip and cook until other side is crispy',
      'Season with salt if available'
    ],
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 240,
      protein: 4,
      carbs: 45,
      fat: 6
    },
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Crispy', 'Snack', 'Simple']
  },
  {
    id: '4',
    name: 'Pasta with Garlic Oil',
    description: 'Classic aglio e olio - pasta with garlic-infused olive oil',
    ingredients: ['pasta', 'garlic', 'olive oil'],
    instructions: [
      'Cook pasta according to package directions',
      'Slice garlic thinly',
      'Heat olive oil in a large pan over low heat',
      'Add garlic and cook until lightly golden',
      'Toss drained pasta with the garlic oil',
      'Serve immediately'
    ],
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 68,
      fat: 14
    },
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Italian', 'Simple', 'Quick']
  },
  {
    id: '5',
    name: 'Tomato Onion Scramble',
    description: 'Eggs scrambled with fresh tomatoes and onions',
    ingredients: ['eggs', 'tomatoes', 'onion'],
    instructions: [
      'Dice onion and tomatoes',
      'Heat a pan over medium heat',
      'Cook onion until softened',
      'Add tomatoes and cook until they release juice',
      'Beat eggs and pour into the pan',
      'Scramble everything together until eggs are set'
    ],
    cookingTime: 10,
    servings: 1,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 220,
      protein: 16,
      carbs: 12,
      fat: 12
    },
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Breakfast', 'Healthy', 'Quick']
  },
  {
    id: '6',
    name: 'Spiced Rice Bowl',
    description: 'Rice seasoned with whatever spices you have on hand',
    ingredients: ['rice', 'onion', 'oil'],
    instructions: [
      'Dice onion finely',
      'Heat oil in a pot over medium heat',
      'Sauté onion until golden',
      'Add rice and stir for 2 minutes',
      'Add water (2:1 ratio) and bring to boil',
      'Reduce heat, cover and simmer for 18 minutes'
    ],
    cookingTime: 25,
    servings: 3,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 56,
      fat: 4
    },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Filling', 'Simple', 'Base']
  },
  {
    id: '7',
    name: 'Crispy Egg Sandwich',
    description: 'Fried egg between toasted bread slices',
    ingredients: ['eggs', 'bread', 'butter'],
    instructions: [
      'Heat butter in a pan over medium heat',
      'Toast bread slices until golden',
      'Fry egg sunny-side up or over-easy',
      'Place egg between toast slices',
      'Cut in half and serve hot'
    ],
    cookingTime: 8,
    servings: 1,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 28,
      fat: 22
    },
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Sandwich', 'Quick', 'Filling']
  },
  {
    id: '8',
    name: 'Simple Pasta Toss',
    description: 'Plain pasta tossed with butter and whatever you have',
    ingredients: ['pasta', 'butter'],
    instructions: [
      'Cook pasta according to package directions',
      'Reserve 1/2 cup pasta water before draining',
      'Return pasta to pot over low heat',
      'Add butter and toss until melted',
      'Add pasta water if needed for creaminess',
      'Season with salt and pepper if available'
    ],
    cookingTime: 12,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 350,
      protein: 10,
      carbs: 58,
      fat: 10
    },
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Simple', 'Comfort', 'Quick']
  },
  {
    id: '9',
    name: 'Roasted Potato Wedges',
    description: 'Potato wedges roasted until crispy outside, fluffy inside',
    ingredients: ['potatoes', 'oil'],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Cut potatoes into wedges',
      'Toss with oil until well coated',
      'Arrange on baking sheet in single layer',
      'Roast for 25-30 minutes until golden',
      'Flip halfway through cooking'
    ],
    cookingTime: 35,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 260,
      protein: 4,
      carbs: 48,
      fat: 6
    },
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Roasted', 'Crispy', 'Side']
  },
  {
    id: '10',
    name: 'Onion Rice Pilaf',
    description: 'Fragrant rice cooked with caramelized onions',
    ingredients: ['rice', 'onion', 'butter'],
    instructions: [
      'Slice onions thinly',
      'Heat butter in a pot over medium heat',
      'Cook onions until golden and caramelized (10 minutes)',
      'Add rice and stir for 2 minutes',
      'Add water (2:1 ratio) and bring to boil',
      'Cover and simmer for 18 minutes'
    ],
    cookingTime: 30,
    servings: 3,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 300,
      protein: 6,
      carbs: 58,
      fat: 6
    },
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Aromatic', 'Comfort', 'Simple']
  },
  {
    id: '11',
    name: 'Quick Tomato Pasta',
    description: 'Simple pasta with fresh tomatoes',
    ingredients: ['pasta', 'tomatoes', 'garlic'],
    instructions: [
      'Cook pasta according to package directions',
      'Dice tomatoes and mince garlic',
      'Heat a pan over medium heat',
      'Sauté garlic for 30 seconds',
      'Add tomatoes and cook until they break down',
      'Toss with drained pasta'
    ],
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true,
      nutFree: true
    },
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 72,
      fat: 2
    },
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Fresh', 'Light', 'Quick']
  },
  {
    id: '12',
    name: 'Butter Toast Points',
    description: 'Crispy buttered toast cut into triangles - simple comfort food',
    ingredients: ['bread', 'butter'],
    instructions: [
      'Heat a pan over medium heat',
      'Butter one side of bread slices',
      'Place butter-side down in pan',
      'Cook until golden brown',
      'Butter the top side and flip',
      'Cook until second side is golden',
      'Cut into triangles and serve'
    ],
    cookingTime: 6,
    servings: 1,
    difficulty: 'Easy',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: true
    },
    nutrition: {
      calories: 220,
      protein: 6,
      carbs: 28,
      fat: 10
    },
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Toast', 'Simple', 'Snack']
  }
];