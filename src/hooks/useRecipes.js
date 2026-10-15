
import { useState, useEffect } from "react";
import axios from "axios";

function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      setLoading(false);
      setError("");
      return;
    }

    async function fetchRecipes() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );

        setData(response.data.meals || []);
      } catch {
        setError("Unable to load recipes");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [query]);

  return { data, loading, error };
}

export default useRecipes;
