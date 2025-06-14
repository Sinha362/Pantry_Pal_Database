import React from 'react';
import { Filter, Tag } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  // Common recipe categories - you can modify these based on your backend categories
  const categories = [
    'All Categories',
    'Breakfast',
    'Lunch', 
    'Dinner',
    'Snack',
    'Dessert',
    'Appetizer',
    'Side Dish',
    'Soup',
    'Salad',
    'Beverage',
    'Main Course',
    'Vegetarian',
    'Vegan'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-600" />
        Filters
      </h2>

      <div className="max-w-md">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-1">
            <Tag className="w-4 h-4" />
            Category
          </h3>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value === 'All Categories' ? '' : e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Filter recipes by category. Changes will automatically refresh results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;