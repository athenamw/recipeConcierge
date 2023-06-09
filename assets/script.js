const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const daily = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");

daily.addEventListener("click", () => {
  fetch(randomRecipeApi)
    .then((res) => res.json())
    .then((res) => {
      var recipe = res.meals[0];
      console.log(recipe);
      console.log(recipe.strMeal);
      console.log(recipe.strMealThumb);
    });
});
