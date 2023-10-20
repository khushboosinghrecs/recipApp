import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce'; // Import debounce from lodash
import Item from './Item';
import { Link } from "react-router-dom";
import { instance } from '../utills/constant';



const RecipeList = () => {
   const [recipes, setRecipes] = useState([]);
   const [query, setQuery] = useState('');
   const [loading, setLoading] = useState(false);
   // const instance = axios.create({
   //    baseURL: 'http://localhost:8081',
   //  });

   const debouncedSearchRecipes = useMemo(
     () =>
       debounce(async (searchQuery) => {
         try {
           if (searchQuery) {
             console.log('searchquery', searchQuery);
             const response = await instance.get('/search/recipes', {
               params: { query: searchQuery },
             });
             setRecipes(response.data);
           } else {
             const response = await instance.get('/search/recipes');
             setRecipes(response.data);
           }
           setLoading(false);
         } catch (error) {
           console.error('Error fetching recipes:', error);
           throw error;
         }
       }, 300),
     []
   );

   const handleQueryChange = (e) => {
     const newQuery = e.target.value;
     setQuery(newQuery);
     setLoading(true);
     debouncedSearchRecipes(newQuery);
   };

   useEffect(() => {
      // Initially fetch recipes with an empty query
      debouncedSearchRecipes('');
   }, [debouncedSearchRecipes]);

   return (
     <div>
       {loading ? (
         <p>Loading...</p>
       ) : (
         <div>
           <form onSubmit={(e)=>e.preventDefault}>
              <input
                 type="text"
                 value={query}
                 onChange={handleQueryChange}
              />
              <button type='button'>search</button>
           </form>
           <div style={{display: 'flex'}}>
            {recipes.map((recipe) => (
               <Link to = {"/recipe/" + recipe.id}> <Item key={recipe.id} id={recipe.id} name={recipe.title} image={recipe.image} /> </Link>
            ))}
           </div>
         </div>
       )}
     </div>
   );
};

export default RecipeList;
