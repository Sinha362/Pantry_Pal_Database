import React from 'react';
import { ChefHat, Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <ChefHat className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pantry Pal</h1>
            <p className="text-emerald-100 text-sm flex items-center gap-1">
              <Lightbulb className="w-4 h-4" />
              Use only what you have - no shopping required!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;