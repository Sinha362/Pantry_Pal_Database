import React from 'react';
import { ChefHat, Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <ChefHat className="w-12 h-12" /> {/* 👈 Bigger icon */}
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold">Pantry Pal</h1>
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