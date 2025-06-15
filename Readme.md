Here is a clean and professional `README.md` for your **PantryPal** project, styled for GitHub:

---

````markdown
# 🥫 PantryPal – Your AI Recipe Assistant

PantryPal is a smart recipe recommendation web app that helps you cook with what you already have. Simply enter the ingredients in your kitchen, and our ML-powered engine will suggest the most relevant recipes — saving you time, money, and waste.

![PantryPal Screenshot](./screenshot.png)

---

## 🚀 Live Demo

🧠 Backend (FastAPI deployed on Hugging Face):  
**Private for now**

🌐 Frontend (React):  
**Coming soon**

---

## 🔧 Tech Stack

| Layer         | Tech                              | Purpose                                      |
|---------------|-----------------------------------|----------------------------------------------|
| Frontend      | React + TypeScript + TailwindCSS  | User interface and interactions              |
| Backend       | FastAPI                           | REST API for recipe search                   |
| ML Model      | `sentence-transformers`           | Semantic embedding for ingredients           |
| Vector Store  | `NumPy` array (precomputed)       | Embedding storage for recipes                |
| Deployment    | Hugging Face Spaces               | Hosting the backend server                   |
| Data Source   | [TheMealDB](https://www.themealdb.com/) | Real-world recipes with images and instructions |

---

## ✨ Features

- 🔍 **Semantic Recipe Search**  
  Uses machine learning to understand ingredient combinations and return relevant recipes.

- 🥗 **Filters by Category**  
  Easily narrow down recipes to categories like Vegetarian, Dessert, etc.

- 💡 **Clean, Responsive UI**  
  Built with TailwindCSS to ensure a smooth user experience on all devices.

- 📷 **Real Images + Instructions**  
  Recipes are linked with images and step-by-step guides from TheMealDB.

---

## 🧠 How It Works

1. **User inputs ingredients** (e.g., `"onion, tomato, garlic"`).
2. Ingredients are encoded into a semantic vector using a locally hosted transformer model.
3. Cosine similarity is calculated against precomputed recipe vectors.
4. Top 10 recipes are returned, ranked by relevance.
5. Frontend displays the results in an elegant, card-based layout.

---

## 🗃️ Data & Model

- **Model**: [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)
- **Recipes**: Fetched and cleaned from TheMealDB
- **Embeddings**: Preprocessed and stored in `recipe_vectors.npy`
- **Backend Logic**: Search endpoint ranks recipes using cosine similarity

---

## 🛠️ Dev Setup

### Clone the development branch
```bash
git clone -b development https://github.com/Unica2804/Pantry_Pal.git
cd pantrypal
````

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

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