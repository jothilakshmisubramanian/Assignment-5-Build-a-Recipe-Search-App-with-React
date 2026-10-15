
import { useState } from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

function Recipes({ favourites, toggleFavourite }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const { data: recipes, loading, error } = useRecipes(query);

  function handleSubmit(event) {
    event.preventDefault();

    if (searchTerm.trim()) {
      setQuery(searchTerm.trim());
    }
  }

  function isFavourite(id) {
    return favourites.some((item) => item.idMeal === id);
  }

  return (
    <section>
      <header className="page-header">
        <span className="eyebrow">Find your next favourite</span>
        <h1 className="page-title">Explore Recipes</h1>
        <p className="page-description">
          Search delicious meals and discover something new to cook.
        </p>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search recipes, e.g. chicken..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search recipes"
        />

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {loading && (
        <div className="status-message">
          <div className="spinner" />
          Finding delicious recipes...
        </div>
      )}

      {error && (
        <p className="status-message error-message">
          {error}. Please try again.
        </p>
      )}

      {!loading && !error && recipes.length === 0 && (
        <p className="status-message">
          No recipes found. Try another search.
        </p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <p className="page-description" style={{ marginBottom: 20 }}>
            Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
          </p>

          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const saved = isFavourite(recipe.idMeal);

              return (
                <article className="recipe-card" key={recipe.idMeal}>
                  <Link
                    className="recipe-image-link"
                    to={`/recipes/${recipe.idMeal}`}
                  >
                    <img
                      className="recipe-image"
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      loading="lazy"
                    />
                  </Link>

                  <div className="recipe-content">
                    <h3>
                      <Link to={`/recipes/${recipe.idMeal}`}>
                        {recipe.strMeal}
                      </Link>
                    </h3>

                    <div className="recipe-meta">
                      <span>🍽️ {recipe.strCategory || "Meal"}</span>
                      <span>•</span>
                      <span>{recipe.strArea || "International"}</span>
                    </div>

                    <div className="recipe-actions">
                      <Link
                        className="recipe-link"
                        to={`/recipes/${recipe.idMeal}`}
                      >
                        View Recipe →
                      </Link>

                      <button
                        type="button"
                        className={`favourite-btn ${
                          saved ? "is-favourite" : ""
                        }`}
                        onClick={() => toggleFavourite(recipe)}
                        aria-label={
                          saved
                            ? `Remove ${recipe.strMeal} from favourites`
                            : `Save ${recipe.strMeal} to favourites`
                        }
                        aria-pressed={saved}
                        title={
                          saved
                            ? "Remove from favourites"
                            : "Add to favourites"
                        }
                      >
                        {saved ? "♥" : "♡"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default Recipes;
