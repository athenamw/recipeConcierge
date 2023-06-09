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
