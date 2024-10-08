// Make the variable object
// const recipe = {
//     title: "Nasi Goreng (Fried Rice)",
//     instruction: "Heat oil in a pan. Add garlic, shallots, and chili, sauté until fragrant. Add chicken or shrimp, cook until done. Add rice and stir-fry until heated through. Add sweet soy sauce and salt, mix well. Serve with fried egg on top.",
//     image: "https://i.ibb.co.com/k8BTQRV/079979700-1587487794-Sajiku-1.jpg",
// };

// Put to variable to connect to where will the script function and display the recipe
const getRecipeButton = document.getElementById('getRecipeBtn'); // variable for button click
const getRecipeContainer = document.getElementById('recipeContainer'); // variable for inserting the recipe

// Function to display the recipe 
// content that will display
function displayRecipe(recipe) {
    // Hide the button after clicking
    // getRecipeButton.style.display = 'none';

    //checking is the recipe available?
    if(!recipe || !recipe.instruction) {
        console.error('Recipe is not available');
        getRecipeContainer.innerHTML = `<p>Failed to load recipe</p>`;
        return;
    }

    //create order list for recipe
    const instructionsArray = recipe.instruction.split('. ').filter(step => step.trim());
    const instructionsList = instructionsArray.map(step => `<li>${step}</li>`).join('');

    // Create HTML content for the recipe
    getRecipeContainer.innerHTML = `
    <h2 class="recipe-title" style="font-family: 'Calistoga', serif;">${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" style="width: 400px; height: auto;">
    <ol class="recipe-instructions" style="text-align: justify">${instructionsList}</ol>
    `;
}

//fetch recipe from the Meal idb API
async function fetchRandomRecipe () {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        console.log(response); //to debugging
        if (!response.ok) {
            throw new Error('Unavailable Network');
        }
        const data = await response.json();
        console.log(data);

        //Check the meals and firstMeal
        if (!data.meals || !data.meals[0]) {
            throw new Error('No meals found');
        }

        const recipe = {
            title: data.meals[0].strMeal,
            instruction: data.meals[0].strInstructions,
            image: data.meals[0].strMealThumb,
        };
        displayRecipe(recipe);
    } catch (error) {
        console.error('There is a problem with fetch:', error);
        getRecipeContainer.innerHTML = `<p>Failed to load recipe. Please try again later.</p>`;
    }
}

// Execute by adding with event listener to the button
getRecipeButton.addEventListener('click', () => {
    fetchRandomRecipe();
});