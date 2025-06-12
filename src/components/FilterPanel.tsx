import React from 'react';
import { Filter, Clock, Star } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    updateFilter('difficulty', newDifficulties);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-600" />
        Filters
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Dietary Preferences */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Dietary Preferences</h3>
          <div className="space-y-2">
            {[
              { key: 'vegetarian', label: 'Vegetarian' },
              { key: 'vegan', label: 'Vegan' },
              { key: 'glutenFree', label: 'Gluten-Free' },
              { key: 'dairyFree', label: 'Dairy-Free' },
              { key: 'nutFree', label: 'Nut-Free' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[key as keyof FilterOptions] as boolean}
                  onChange={(e) => updateFilter(key as keyof FilterOptions, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Time */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Max Cooking Time
          </h3>
          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={filters.maxCookingTime}
              onChange={(e) => updateFilter('maxCookingTime', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10 min</span>
              <span className="font-medium text-blue-600">{filters.maxCookingTime} min</span>
              <span>2 hours</span>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-1">
            <Star className="w-4 h-4" />
            Difficulty
          </h3>
          <div className="space-y-2">
            {['Easy', 'Medium', 'Hard'].map((difficulty) => (
              <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={() => toggleDifficulty(difficulty)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;