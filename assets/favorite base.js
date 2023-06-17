const recipes = "https:www.themealdb.com/api/json/v1/1/search.php?s=";
const rdmrecipes = "https://www.themealdb.com/api/json/v1/1/random.php";

window.addEventListener("load", function () {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  var favoritesSection = document.getElementById("favMini");
  for (let i = 0; i < favorites.length; i++) {
    console.log(favorites[i]);
    // document.querySelectorAll(".columns")[1];
    var recName = favorites[i].strMeal;
    var pic = favorites[i].strMealThumb;
    let mealDiv = document.createElement("section");

    let mealContainer = document.createElement("section");
    mealContainer.id = "recipe " + i;
    // mealContainer.classList.add("columns", "is-one-third");
    let mealName = document.createElement("h2");
    mealName.id = "recName " + i;

    // create the p element for the recipe
    let measurements = document.createElement("p");
    measurements.id = "ingredients";

    //displays the image
    let image = document.createElement("img");
    image.id = "recipe";
    image.src = pic;
    image.alt = "Meal Photograph";

    let instructions = document.createElement("p");
    instructions.id = "instructions";

    mealName.textContent = recName;
    mealContainer.appendChild(mealName);

    image.textContent = pic;
    // appends the image to container
    mealContainer.appendChild(image);

    for (var j = 1; j <= 20; j++) {
      var ingredientKey = "strIngredient" + j;
      var ingredientValue = favorites[i][ingredientKey];
      var measureKey = "strMeasure" + j;
      var measureValue = favorites[i][measureKey];
      // displays the values under the photo
      if (ingredientValue && measureValue) {
        measurements.innerHTML += `${measureValue} of ${ingredientValue}<br>`;
        mealContainer.appendChild(measurements);
      }
    }
    instructions.innerHTML =
      "Instructions<br>" +
      favorites[i].strInstructions.replaceAll("\r\n", "<br>");
    mealContainer.appendChild(instructions);

    //added div to the container
    mealDiv.append(mealContainer);
    favoritesSection.append(mealDiv);
  }
});
