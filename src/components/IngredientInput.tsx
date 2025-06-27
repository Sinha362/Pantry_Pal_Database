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
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-900/30 p-4 sm:p-6 mb-6 sm:mb-8 max-w-3xl mx-auto border border-slate-700/40">
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          <span className="hidden xs:inline">What ingredients do you have?</span>
          <span className="xs:hidden">Your Ingredients</span>
        </h2>
        <p className="text-slate-400 mb-0 max-w-xl text-sm sm:text-base px-2">
          Add your ingredients and we'll find recipes that match what you have available!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative mb-3 sm:mb-4">
        <div className="flex flex-col xs:flex-row gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type an ingredient you have..."
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:ring-2 hover:ring-emerald-300/30 hover:border-emerald-400/40 transition duration-250 outline-none text-white placeholder-slate-400 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium shadow-lg shadow-emerald-500/20 text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Add</span>
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
            className="space-y-3 sm:space-y-4 overflow-hidden"
          >           
            <h3 className="font-semibold text-slate-300 text-sm sm:text-base">Your selected ingredients:</h3>
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
                    className="bg-emerald-500/15 text-emerald-300 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 capitalize border border-emerald-500/25"
                  >
                    <span className="truncate max-w-[120px] sm:max-w-none">{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(index)}
                      className="hover:bg-emerald-500/25 rounded-full p-0.5 transition-colors flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                onClick={onGoClick}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center gap-2 sm:gap-3 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="hidden xs:inline">Find My Recipes</span>
                <span className="xs:hidden">Find Recipes</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {!showResults && (
              <p className="text-center text-slate-500 text-xs sm:text-sm mt-2 px-2">
                Click "Find Recipes" to see what you can make with these ingredients!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IngredientInput;