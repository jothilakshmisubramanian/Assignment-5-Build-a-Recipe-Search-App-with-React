
import { Link } from "react-router-dom";

function Favourites({ favourites, toggleFavourite }) {
  return (
    <section>
      <header className="page-header">
        <span className="eyebrow">Your personal collection</span>
        <h1 className="page-title">My Favourites ♥</h1>
        <p className="page-description">
          All your saved recipes, together in one place.
        </p>
      </header>

      {favourites.length === 0 ? (
        <div className="status-message">
          <h2>No favourites yet!</h2>
          <p>Save recipes you love, and they will appear here.</p>
          <Link
            to="/recipes"
            className="btn btn-primary"
            style={{ marginTop: 20 }}
          >
            Explore Recipes →
          </Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {favourites.map((recipe) => (
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

                <div className="recipe-actions">
                  <Link
                    className="recipe-link"
                    to={`/recipes/${recipe.idMeal}`}
                  >
                    View Recipe →
                  </Link>

                  <button
                    type="button"
                    className="favourite-btn is-favourite"
                    onClick={() => toggleFavourite(recipe)}
                    aria-label={`Remove ${recipe.strMeal} from favourites`}
                  >
                    ♥
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favourites;
