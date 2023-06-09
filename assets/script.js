const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const dailyBtn = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");
var recipeName = document.getElementById("recipeName");

function getRandomRecipe() {
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.meals);
        var recipe = data.meals[0];
        var recipeName = document.getElementById("recipeName");
        recipeName.textContent = recipe.strMeal;
        var img = document.getElementById("image");
        img.src = recipe.strMealThumb;
        var ingredients = document.getElementById("ingredients");
        // ingredients.textContent =
        //   recipe.strMeasure1.trim() + " " + recipe.strIngredient1.trim();
        var ingredientList = recipe.strMeasure;
        var measure = recipe.strIngredient;
        console.log(ingredientList);
        console.log(measure);
        for (let i = 1; i <= 20; i++) {
          ingredients.textContent = measure + " " + ingredientList;
        }
      });
    }
  });
}
window.addEventListener("load", getRandomRecipe);
dailyBtn.addEventListener("click", getRandomRecipe);

const generateMeal = function (meal) {};
