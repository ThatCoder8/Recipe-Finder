const apiKey = '30425538d7034aa0a3c5401c6bafd59b'
const apiUrl = 'https://api.spoonacular.com/recipes';

function fetchRecipes(ingredients) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = '<p>Loading recipes...</p>';

    // Remove the 'diet' parameter to get all recipes
    const url = `${apiUrl}/search?apiKey=${apiKey}&query=${ingredients}&number=5`;

  // Using fetch to make a GET request
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.results && data.results.length > 0) {
        // Process the response data and update your UI
        displayRecipes(data.results);
      } else {
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      recipeContainer.innerHTML = `<p>Error fetching recipes. ${error.message}</p>`;
    });
}

// Function to display recipes on the UI
function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-container');
  recipeContainer.innerHTML = ''; // Clear previous results

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const ingredientsText = Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0
      ? `<p>Ingredients: ${recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>`
      : '<p>No ingredients listed</p>';

    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" />
      ${ingredientsText}
    `;
    
    // Add a clickable link to the Spoonacular website for more details
    const link = document.createElement('a');
    link.href = recipe.sourceUrl;
    link.textContent = 'View Recipe Details';
    recipeCard.appendChild(link);

    recipeContainer.appendChild(recipeCard);
  });
}

// Function to handle the search button click
function searchRecipes() {
  const ingredientsInput = document.getElementById('ingredients');
  const ingredients = ingredientsInput.value.trim();

  if (ingredients === '') {
    alert('Please enter ingredients.');
    return;
  }

  fetchRecipes(ingredients);

  // Clear input field after initiating the search
  ingredientsInput.value = '';
}