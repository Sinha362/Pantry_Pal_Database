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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-4 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-emerald-600 p-3 rounded-xl shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Pantry Pal</h1>
              <p className="text-sm text-emerald-600 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Your Everyday Cooking Companion!
              </p>
            </div>
          </motion.div>

          {/* Auth Button */}
          <motion.button
            onClick={onAuthClick}
            className="bg-white text-emerald-600 px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl border border-emerald-200 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Login / Sign Up
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Discover Recipes Based on Your Ingredients
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
              >
                Turn your Pantry into
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> a recipe book</span>
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Turn your available ingredients into meal possibilities. Our smart recipe matcher finds the best-fitting dishes from your kitchen and lets you know what else you might need—so you can cook smarter, waste less, and discover more.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <feature.icon className="w-6 h-6 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-8 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">1000+</div>
                <div className="text-sm text-gray-600">Recipes Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-sm text-gray-600">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">Minimize</div>
                <div className="text-sm text-gray-600">Food Waste</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
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
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - App Preview */}
          <motion.div 
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end pr-4 lg:pr-14"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Phone Mockup */}
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden w-80 h-[640px] relative">
                  {/* Status Bar */}
                  <div className="bg-gray-50 h-8 flex items-center justify-center">
                    <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  {/* App Content Preview */}
                  <div className="p-4 space-y-4 bg-gradient-to-br from-emerald-50 to-teal-50 h-full">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-emerald-600 p-2 rounded-lg">
                        <ChefHat className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Pantry Pal</div>
                        <div className="text-xs text-emerald-600">Your Recipe Companion</div>
                      </div>
                    </div>

                    {/* Search Box */}
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-700 mb-2">Your Ingredients:</div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">chicken</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">rice</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">onion</span>
                      </div>
                      <div className="bg-emerald-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                        Find Recipes
                      </div>
                    </div>

                    {/* Recipe Cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjDoJDYLZa2PeXjl8xXPndDxSoJZfFCg7TCw&s"
                          alt="Chicken Fried Rice"
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />

                        <div className="font-medium text-sm text-gray-800">Chicken Fried Rice</div>
                        <div className="text-xs text-gray-600">95% Match</div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs inline-block mt-1">
                          Great Match
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gxgQ9EciwS8hwiDnyk4DR5GQyozkHxOxkQ&s"
                          alt="Chicken Curry"
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />

                        <div className="font-medium text-sm text-gray-800">Chicken Curry</div>
                        <div className="text-xs text-gray-600">87% Match</div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs inline-block mt-1">
                          Great Match
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white p-3 rounded-xl shadow-lg"
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
                <Search className="w-5 h-5 text-emerald-600" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
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
                <Heart className="w-5 h-5 text-red-500" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-white p-2 rounded-full shadow-lg"
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
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200/30 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;