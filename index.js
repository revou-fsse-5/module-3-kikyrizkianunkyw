//Make the variabel object
const recipe = {
    title : "Nasi Goreng (Fried Rice)",
    instruction : "1. Heat oil in a pan. 2. Add garlic, shallots, and chili, sauté until fragrant. 3. Add chicken or shrimp, cook until done. 4. Add rice and stir-fry until heated through. 5. Add sweet soy sauce and salt, mix well. 6. Serve with fried egg on top.",
    image : "https://i.ibb.co.com/k8BTQRV/079979700-1587487794-Sajiku-1.jpg",  
};

//Put to variable to connect to where will the script functioning an event and display the recipe
const getRecipeButton = document.getElementById('getRecipeBtn'); //variable for button click
const getRecipeContainer = document.getElementById('recipeContainer'); //variable for inserting the recipe


// Function to display the recipe 
// content that will display
function displayRecipe(recipe) {
    recipeContainer.innerHTML = `
    <h2 class="recipe-title">${recipe.title}</h2>
    <img src="{recipe.image}" alt="${recipe.title} class="recipe-image">
    <p class="recipe-instruction">${recipe.instruction}
    `;
}

//Execute with event listener
getRecipeButton.addEventListener('click', () => {
    displayRecipe(recipe);
});
