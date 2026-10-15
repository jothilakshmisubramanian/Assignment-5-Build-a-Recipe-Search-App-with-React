
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";

function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("recipe_favourites") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "recipe_favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  function toggleFavourite(recipe) {
    setFavourites((previous) => {
      const exists = previous.some(
        (item) => item.idMeal === recipe.idMeal
      );

      return exists
        ? previous.filter((item) => item.idMeal !== recipe.idMeal)
        : [...previous, recipe];
    });
  }

  return (
    <div className="app">
      <Navbar favouritesCount={favourites.length} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/recipes"
            element={
              <Recipes
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            }
          />

          <Route
            path="/recipes/:id"
            element={<RecipeDetail />}
          />

          <Route
            path="/favourites"
            element={
              <Favourites
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        Made with care for food lovers 🍃
      </footer>
    </div>
  );
}

export default App;
