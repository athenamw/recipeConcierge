const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const daily = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");

daily.addEventListener("click", function () {
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.meals);
      });
    }
  });
});

function addFavoriteRecipe(recipeId) {
  // Check to see if the recipe is already on the favorites list
  if (localStorage.getItem("favoriteRecipes") === null) {
    // Since the favorites list is empty, add it to the list
    localStorage.setItem("favoriteRecipes", recipeId);
  } else {
    // Since the favorites list is not empty, check to see if the recipe is already there
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
    if (favoriteRecipes.indexOf(recipeId) === -1) {
      // Since the recipe is not in the favorites list then add it
      favoriteRecipes.push(recipeId);
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    }  
  }
}

function removeFavoriteRecipe(recipeId) {
  // Check to see if the recipe is in the favorites list
  const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
  if (favoriteRecipes !== null && favoriteRecipes.indexOf (recipeId) !== -1) {
    // Since the recipe is there then remove it
    favoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }
}

function getFavoriteRecipes() {
  // Get the favorites list from local storage
  const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
  return favoriteRecipes;
}
const generateMeal = function (meal) {};
