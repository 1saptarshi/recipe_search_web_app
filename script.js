document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    searchRecipes(query);
});

async function searchRecipes(query) {
    const APP_ID = '7e45dd0c'; // Replace with your Edamam APP ID
    const APP_KEY = 'ccd181afeffd8970e7df551943948528'; // Replace with your Edamam APP KEY
    const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        displayResults(data.hits);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(recipes) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';

    if (recipes.length === 0) {
        resultsSection.innerHTML = '<p class="text-white">No recipes found. Try another search!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipeCard max-w-full max-h-96 rounded-lg overflow-hidden shadow-xl m-1 bg-gradient-to-r from-white to-gray-100 hover:shadow-2xl transition-shadow duration-300';

        const recipeImage = document.createElement('img');
        recipeImage.className = 'w-full';
        recipeImage.src = recipe.recipe.image;
        recipeImage.alt = recipe.recipe.label;

        const recipeInfo = document.createElement('div');
        recipeInfo.className = 'px-6 py-4';

        const recipeTitle = document.createElement('div');
        recipeTitle.className = 'font-bold text-xl mb-2';
        recipeTitle.textContent = recipe.recipe.label;

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.recipe.url;
        recipeLink.target = '_blank';
        recipeLink.className = 'text-green-500';
        recipeLink.textContent = 'View Recipe';

        recipeInfo.appendChild(recipeTitle);
        recipeInfo.appendChild(recipeLink);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeInfo);
        resultsSection.appendChild(recipeCard);
    });
}
