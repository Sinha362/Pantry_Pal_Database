import React from 'react';
import { ChefHat, Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white shadow-lg shadow-slate-900/30 border-b border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 sm:p-3 rounded-lg backdrop-blur-sm shadow-lg shadow-emerald-500/20">
            <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Pantry Pal</h1>
            <p className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
              Your Everyday Cooking Companion!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;