# 🍱 PantryPal – Your AI Recipe Assistant

PantryPal is a smart recipe recommendation web app that helps you cook with what you already have.  
Just enter your available ingredients, and PantryPal will suggest the best recipes using AI-powered similarity matching.

![PantryPal Screenshot](./screenshot.png)

---

## 🚀 Live Demo

🧠 **Backend** (FastAPI, deployed on Hugging Face):  
**🔒 Private for now**

🌐 **Frontend** (React):  
**⏳ Coming soon**

---

## 🛠️ Tech Stack

| Layer         | Tech                                 | Purpose                                           |
|--------------|--------------------------------------|--------------------------------------------------|
| Frontend      | React + TypeScript + TailwindCSS     | User interface and interactions                  |
| Backend       | FastAPI                              | REST API for recipe search                       |
| ML Model      | `sentence-transformers`              | Semantic embedding for ingredients               |
| Vector Store  | `NumPy` array (precomputed)          | Embedding storage for recipes                    |
| Deployment    | Hugging Face Spaces                  | Hosting the backend server                       |
| Data Source   | [TheMealDB](https://www.themealdb.com/) | Real-world recipes with images and instructions |

---

## 📌 Features

- 🔍 AI-powered recipe search based on your ingredients
- 🧠 Semantic similarity via sentence embeddings
- 📦 Ingredient highlighting (used vs missing)
- 🍽️ Category & cuisine filtering
- 🖼️ Real recipe images from TheMealDB
- ⚡ Fast backend API (FastAPI + Hugging Face)

---

## 👩‍🍳 Powered By

- [TheMealDB](https://www.themealdb.com/)
- [Hugging Face Spaces](https://huggingface.co/spaces)
- [Sentence Transformers](https://www.sbert.net/)


## 📦 Folder Structure

```
Pantry_Pal/
├── .bolt/
├── .git/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── FilterPanel.tsx
│   │   ├── Header.tsx
│   │   ├── IngredientInput.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeGrid.tsx
│   │   ├── RecipeModal.tsx
│   ├── types/
│   │   ├── index.ts
│   ├── utils/
│       ├── recipeUtils.ts
```

---

## 📈 Future Enhancements

* [ ] Format long instructions into readable steps
* [ ] Add image caching or CDN proxy for faster load times globally
* [ ] User auth to save favorite recipes
* [ ] Add nutritional info or dietary filters

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍🍳 Built With ❤️ for Hackathons

Crafted to solve real-world problems using ML, design, and data.