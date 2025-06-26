import React from 'react';
import { ChefHat, Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg shadow-slate-900/50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-lg backdrop-blur-sm shadow-lg shadow-emerald-500/25">
            <ChefHat className="w-12 h-12" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white">Pantry Pal</h1>
            <p className="text-emerald-400 text-sm flex items-center gap-1">
              <Lightbulb className="w-4 h-4" />
              Your Everyday Cooking Companion!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;