const axios = require('axios')

const apiKey = 'eb3eb1cc81024e6d98107b3445d32794';

const instance = axios.create({
 baseURL: 'https://api.spoonacular.com',
 params: { apiKey },
});

 const searchRecipes = async (query) => {
 try {
    const response = await instance.get('/recipes/complexSearch', {
      params: { query },
    });
    return response.data.results;
 } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
 }
};

const getRecipeDetails = async (id) => {
 try {
   console.log('id id idhello id', id);
    const response = await instance.get(`/recipes/${id}/information`);
    return response.data;
 } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
 }
};

module.exports = {
 getRecipeDetails,
 searchRecipes,
  }