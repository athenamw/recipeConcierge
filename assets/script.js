const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const dailyBtn = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");

function getRandomRecipe() {
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.meals);
        var recipe = data.meals[0];
        var img = document.createElement("img");
        img.src = recipe.strMealThumb;
        document.body.appendChild(img);
      });
    }
  });
}
window.addEventListener("load", getRandomRecipe);
dailyBtn.addEventListener("click", getRandomRecipe);

const generateMeal = function (meal) {};
