// make an interface for Recipe , to define what type that the object use for
interface Recipe {
    title: string;
    instruction: string;
    image: string;
}

// connect or get reference in HTML element into Java script variable
const getRecipeButton = document.getElementById('getRecipeBtn') as HTMLButtonElement;
const getRecipeContainer = document.getElementById('recipeContainer') as HTMLDivElement;

// function display recipe
function displayRecipe(recipe: Recipe): void {
    // Check if the recipe is available
    if (!recipe || !recipe.instruction) {
        console.error('Recipe is not available');
        getRecipeContainer.innerHTML = `<p>Failed to load recipe</p>`;
        return;
    }

    // Create ordered list for recipe instructions
    const instructionsArray = recipe.instruction.split('. ').filter(step => step.trim());
    const instructionsList = instructionsArray.map(step => `<li>${step}</li>`).join('');

    // create HTML Content for the recipe just like the JS
    getRecipeContainer.innerHTML = `
        <h2 class="recipe-title" style="font-family: 'Calistoga', serif;">${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" style="width: 400px; height: auto;">
        <ol class="recipe-instructions" style="text-align: justify">${instructionsList}</ol>
    `;
}

// it's Time to fetch!!! 
// Fetch random recipe from the meal DB API
async function fetchRandomRecipe(): Promise<void> {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        console.log(response); // untuk Debugging
        if (!response.ok) {
            throw new Error('Unavailable Network');
        }
        const data = await response.json();
        console.log(data);

        // check the meal
        if (!data.meals || !data.meals[0]) {
            throw new Error('No meals Found');
        }

        const recipe: Recipe = {
            title: data.meals[0].strMeal,
            instruction: data.meals[0].strInstructions, // Corrected typo
            image: data.meals[0].strMealThumb,
        };
        displayRecipe(recipe);
        
    } catch (error) {
        console.error('There is a problem with fetching', error); // Corrected the message to make sense
        getRecipeContainer.innerHTML = `<p>Failed to load recipe. Please try again later.</p>`; // Corrected typo
    }
}

// Execute by adding with event listener to the button
getRecipeButton.addEventListener('click', () => {
    fetchRandomRecipe();
});