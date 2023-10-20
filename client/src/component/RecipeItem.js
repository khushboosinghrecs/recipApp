import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../utills/constant';

const RecipeItem = () => {
  const [recipeDescription, setRecipeDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchDescription = async () => {
    try {
      const response = await instance.get(`/details/${id}`);
      if (response.status == 200) {
        const data = await response;
        console.log(data);

        setRecipeDescription(data);
        setLoading(false);
        console.log('description', recipeDescription, id);
      } else {
        console.log('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchDescription()
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading data...hey</p>
      ) : (
        <div>
          {
            recipeDescription.map((recipeData, index) => (
              <>
                <h2>{recipeData.title}</h2>
                <img src={recipeData.image} alt={recipeData.title} />
                <h3>Ingredients:</h3>
                <ul>
                  {recipeData.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{recipeData.instructions}</p>
              </>
            ))
         }
        </div>
      )}
    </div>
  );
}

export default RecipeItem;
