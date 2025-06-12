import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Search, ArrowRight } from 'lucide-react';
import { commonIngredients } from '../data/ingredients';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  onGoClick: () => void;
  showResults: boolean;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange,
  onGoClick,
  showResults,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
        !ingredients.includes(ingredient)
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients]);

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !ingredients.includes(ingredient.toLowerCase())) {
      onIngredientsChange([...ingredients, ingredient.toLowerCase()]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIngredient(inputValue.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <Search className="w-6 h-6 text-emerald-600" />
        What ingredients do you have?
      </h2>
      <p className="text-gray-600 mb-4">
        Add only the ingredients you currently have. We'll show you recipes that use ONLY these ingredients - no shopping required!
      </p>
      
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type an ingredient you have..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addIngredient(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {ingredients.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Your available ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 capitalize"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  className="hover:bg-emerald-200 rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={onGoClick}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Find My Recipes
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          
          {!showResults && (
            <p className="text-center text-gray-500 text-sm mt-2">
              Click "Find My Recipes" to see what you can make with these ingredients!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;