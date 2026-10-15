// src/pages/RecipeDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function RecipeDetail() {
  const { id } = useParams(); // Extracts the :id from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        // TheMealDB returns an array inside meals, we want the first item
        if (response.data.meals && response.data.meals.length > 0) {
          setRecipe(response.data.meals[0]);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to load recipe details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  // Helper function to extract ingredients & measurements from TheMealDB object
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading recipe details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
          <p>⚠️ {error}</p>
        </div>
        <Link to="/recipes" className="text-orange-500 font-semibold hover:underline">
          &larr; Back to Recipes
        </Link>
      </div>
    );
  }

  if (!recipe) return null;

  const ingredientsList = getIngredients(recipe);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md my-6">
      {/* Back Button */}
      <Link
        to="/recipes"
        className="inline-block mb-6 text-orange-500 font-semibold hover:underline"
      >
        &larr; Back to Search
      </Link>

      {/* Recipe Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-80 object-cover rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
          <p className="text-gray-500 font-medium mb-4">
            Category: <span className="text-orange-600">{recipe.strCategory}</span> | Area: <span className="text-orange-600">{recipe.strArea}</span>
          </p>

          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 max-h-48 overflow-y-auto pr-2">
            {ingredientsList.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Instructions</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
}