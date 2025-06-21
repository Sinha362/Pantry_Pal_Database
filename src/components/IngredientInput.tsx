import React, { useState, useRef } from 'react';
import { Plus, X, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !ingredients.includes(ingredient.toLowerCase())) {
      onIngredientsChange([...ingredients, ingredient.toLowerCase()]);
      setInputValue('');
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
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Search className="w-6 h-6 text-emerald-600" />
          What ingredients do you have?
        </h2>
        <p className="text-gray-600 mb-0 max-w-xl">
          Add your ingredients and we'll find recipes that match what you have available!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type an ingredient you have..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:ring-2 hover:ring-emerald-300 hover:border-emerald-400 transition duration-250 outline-none transition-colors"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>

      <AnimatePresence>
        {ingredients.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-4 overflow-hidden"
          >           
            <h3 className="font-semibold text-gray-700">Your selected ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {ingredients.map((ingredient, index) => (
                  <motion.span
                    key={ingredient + index}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 capitalize"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(index)}
                      className="hover:bg-emerald-200 rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IngredientInput;