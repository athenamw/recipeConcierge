const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("#searchBtn");
const daily = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");

daily.addEventListener("click", () => {
  fetch(randomRecipeApi)
    .then((res) => res.json())
    .then((res) => {
      console.log(res.meals[0]);
    });
});
