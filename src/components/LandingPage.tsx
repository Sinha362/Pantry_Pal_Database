import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight, Lightbulb, Search, Heart, Sparkles, Users, Clock } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onAuthClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onAuthClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: Search,
      title: "Ingredient-Based Recipe Finder",
      description: "Find recipes based on ingredients you already have at home"
    },
    {
      icon: Heart,
      title: "Save Your Favorites",
      description: "Bookmark recipes you love and access them anytime"
    },
    {
      icon: Sparkles,
      title: "Smart Matching",
      description: "Get similarity scores to find the perfect recipe match"
    },
    {
      icon: Clock,
      title: "Cook More, Shop Less",
      description: "Start with what you have — we'll show you what's possible"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-violet-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-36 sm:w-72 h-36 sm:h-72 bg-orange-500/6 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg shadow-emerald-500/20">
              <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-2xl font-bold text-white">Pantry Pal</h1>
              <p className="text-xs sm:text-sm text-emerald-400 flex items-center gap-1">
                <Lightbulb className="w-2 h-2 sm:w-3 sm:h-3" />
                Your Everyday Cooking Companion!
              </p>
            </div>
          </motion.div>

          {/* Auth Button */}
          <motion.button
            onClick={onAuthClick}
            className="bg-slate-800/60 backdrop-blur-sm text-emerald-400 px-3 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-lg shadow-slate-900/30 border border-slate-700/50 hover:border-emerald-500/40 hover:bg-slate-700/60 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">Login / Sign Up</span>
            <span className="sm:hidden">Login</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 backdrop-blur-sm text-emerald-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-emerald-500/25"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Discover Recipes Based on Your Ingredients</span>
                <span className="xs:hidden">Recipe Discovery</span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Turn your Pantry into
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"> a recipe book</span>
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed"
              >
                Turn your available ingredients into meal possibilities. Our smart recipe matcher finds the best-fitting dishes from your kitchen and lets you know what else you might need—so you can cook smarter, waste less, and discover more.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-slate-700/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-800/60"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base text-white mb-1">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center xs:justify-start gap-4 sm:gap-8 pt-2 sm:pt-4"
            >
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-emerald-400">1000+</div>
                <div className="text-xs sm:text-sm text-slate-400">Recipes Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-teal-400">95%</div>
                <div className="text-xs sm:text-sm text-slate-400">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">Minimize</div>
                <div className="text-xs sm:text-sm text-slate-400">Food Waste</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-2 sm:pt-4 flex justify-center xs:justify-start">
              <motion.button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center gap-2 sm:gap-3 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - App Preview */}
          <motion.div 
            variants={itemVariants}
            className="relative flex justify-center order-1 lg:order-2 lg:justify-end pr-0 sm:pr-4 lg:pr-14"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Phone Mockup */}
              <div className="relative bg-gray-900 rounded-[2rem] sm:rounded-[3rem] p-1 sm:p-2 shadow-2xl shadow-gray-900/40 border border-gray-800">
                <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden w-64 sm:w-80 h-[480px] sm:h-[640px] relative border border-slate-800">
                  {/* Status Bar */}
                  <div className="bg-gray-900 h-6 sm:h-8 flex items-center justify-center">
                    <div className="w-16 sm:w-20 h-1 bg-slate-600 rounded-full"></div>
                  </div>
                  
                  {/* App Content Preview */}
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-br from-slate-900 to-gray-900 h-full">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 sm:p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                        <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm sm:text-base">Pantry Pal</div>
                        <div className="text-xs text-emerald-400">Your Recipe Companion</div>
                      </div>
                    </div>

                    {/* Search Box */}
                    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 shadow-lg border border-slate-700/40">
                      <div className="text-xs sm:text-sm font-medium text-slate-300 mb-2">Your Ingredients:</div>
                      <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs border border-emerald-500/30">chicken</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs border border-emerald-500/30">rice</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs border border-emerald-500/30">onion</span>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg shadow-emerald-500/20">
                        Find Recipes
                      </div>
                    </div>

                    {/* Recipe Cards */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 shadow-lg border border-slate-700/40">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjDoJDYLZa2PeXjl8xXPndDxSoJZfFCg7TCw&s"
                          alt="Chicken Fried Rice"
                          className="w-full h-16 sm:h-20 object-cover rounded-lg mb-2"
                        />
                        <div className="font-medium text-xs sm:text-sm text-white">Chicken Fried Rice</div>
                        <div className="text-xs text-slate-400">95% Match</div>
                        <div className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs inline-block mt-1 border border-emerald-500/30">
                          Great Match
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 shadow-lg border border-slate-700/40">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gxgQ9EciwS8hwiDnyk4DR5GQyozkHxOxkQ&s"
                          alt="Chicken Curry"
                          className="w-full h-16 sm:h-20 object-cover rounded-lg mb-2"
                        />
                        <div className="font-medium text-xs sm:text-sm text-white">Chicken Curry</div>
                        <div className="text-xs text-slate-400">87% Match</div>
                        <div className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs inline-block mt-1 border border-emerald-500/30">
                          Great Match
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-slate-800/70 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg shadow-slate-900/40 border border-slate-700/50"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-slate-800/70 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg shadow-slate-900/40 border border-slate-700/50"
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 sm:-right-8 bg-slate-800/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg shadow-slate-900/40 border border-slate-700/50"
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: 1.5
                }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default LandingPage;