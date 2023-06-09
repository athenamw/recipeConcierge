const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const dailyBtn = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");
var recipeName = document.getElementById("recipeName");
var img = document.getElementById("image");
var ingredients = document.getElementById("ingredients");

function getRandomRecipe() {
  ingredients.innerHTML = "Ingredients";
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.meals);
        var recipe = data.meals[0];
        console.log(recipe);
        recipeName.textContent = recipe.strMeal;
        img.src = recipe.strMealThumb;
        var ingredientList = recipe.strMeasure;
        var measure = recipe.strIngredient;
        console.log(measure);
        for (let i = 1; i <= 20; i++) {
          var ingredientKey = "strIngredient" + i;
          var ingredientValue = recipe[ingredientKey];
          console.log(ingredientValue);
          var measureKey = "strMeasure" + i;
          var measureValue = recipe[measureKey];
          console.log(measureValue);

          if (ingredientValue && measureValue) {
            ingredients.innerHTML += `<p>${measureValue} of ${ingredientValue}</p>`;
          }
        }
      });
    }
  });
}

window.addEventListener("load", getRandomRecipe);
dailyBtn.addEventListener("click", getRandomRecipe);

const generateMeal = function (meal) {};
