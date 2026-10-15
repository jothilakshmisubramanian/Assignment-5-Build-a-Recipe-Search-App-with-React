
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Fresh ideas for every meal</span>

        <h1>
          Discover recipes.
          <br />
          <span>Cook with love.</span>
        </h1>

        <p>
          Find delicious recipes, explore new flavours, and save
          your favourite meals in one place.
        </p>

        <Link to="/recipes" className="btn btn-primary">
          Explore Recipes →
        </Link>
      </div>

      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80"
        alt="Fresh and colourful prepared food"
      />
    </section>
  );
}

export default Home;
