const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("searchBtn");
var input = document.getElementById("searchText").value;
const dailyBtn = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");
var recipeName = document.getElementById("recipeName");
var img = document.getElementById("image");
var ingredients = document.getElementById("ingredients");
var instructions = document.getElementById("instructionsText");
var recipe;


function getRandomRecipe() {
  // added this innerHTML because ingredients were not clearing on button clicks. Now refreshes to current recipe
  ingredients.innerHTML = `<h2>Ingredients</h2>`;
  // only applies to h2 which is the first child
  ingredients.firstChild.classList.add(
    "title",
    "is-2",
    "columns",
    "is-centered",
    "m-4",
    "has-text-warning-light"
  );
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        recipe = data.meals[0];
        recipeName.textContent = recipe.strMeal;
        img.src = recipe.strMealThumb;
        var ingredientList = recipe.strMeasure;
        var measure = recipe.strIngredient;
        // loop for getting the measurement and the ingredients paired up
        for (let i = 1; i <= 20; i++) {
          var ingredientKey = "strIngredient" + i;
          var ingredientValue = recipe[ingredientKey];
          //console.log(ingredientValue);
          var measureKey = "strMeasure" + i;
          var measureValue = recipe[measureKey];
          // displays the values under the photo
          if (ingredientValue && measureValue) {
            ingredients.innerHTML += `<p>${measureValue} of ${ingredientValue}</p>`;
          }
        }
        // added replace all because the instructions were running together
        var recipeInstructions = recipe.strInstructions.replaceAll(
          "\r\n",
          "<br>"
        );
        // displays the instructions under the ingredients
        instructions.innerHTML = recipeInstructions;
      });
    }
  });
}
// generates random recipe on page load
window.addEventListener("load", getRandomRecipe);
// generates random recipe on button click
dailyBtn.addEventListener("click", getRandomRecipe);


function getSearchresults() {
  //will grab the input from the user for the search
  var input = document.getElementById("searchText").value;


  //localStorage.setItem("searchText",input);
  var mainSearchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  //calls the api
  fetch(mainSearchApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRecipes(data);
          console.log(data);
    
        });
        //will run if it cant call the api
      } else {
        console.log("error");
      }
    })
    //will run if it cant connect to the server
    .catch(function (error) {
      console.log("error");
    });
  //console logs th user input
  console.log(input);
}

//will display the title when the user clicks the submit button
function displayRecipes(data){
console.log(data);

let dataInfo = document.getElementById("data");
let mealDiv = document.createElement("section");
mealDiv.id = "search-results";

// append the name to a new div
//need to add a class to each div
for (let i = 0; i< data.meals.length; i++) {
console.log(data.meals.length);

  let mealContainer = document.createElement("section");
  mealContainer.id = "recipe " + i;
  let mealName = document.createElement("h2");
  mealName.id = "recipe-name " + i;

  // create the p element for the recipe
  let measurements = document.createElement("p");
  measurements.id = "ingredients";
  
  //displays the image
  let image = document.createElement("img");
  image.id = "recipe";
  image.src = data.meals[i].strMealThumb;
  image.alt = "Meal Photograph";

  let instructions = document.createElement("p");
  instructions.id = "instructions";

  mealName.textContent = data.meals[i].strMeal;
  mealContainer.appendChild(mealName);

  image.textContent = data.meals[i].strMealThumb;
  // appends the image to container
  mealContainer.appendChild(image);


  //will add the ingredients into the container
  for (var j = 1; j <= 20; j++) {  
    var ingredientKey = "strIngredient" + j;
    var ingredientValue = data.meals[i][ingredientKey];
    var measureKey = "strMeasure" + j;
    var measureValue = data.meals[i][measureKey];
// displays the values under the photo
    if (ingredientValue && measureValue) {
     measurements.innerHTML += `${measureValue} of ${ingredientValue}<br>`;
     mealContainer.appendChild(measurements)
    }
  }
  instructions.innerHTML = "Instructions<br>" + data.meals[i].strInstructions.replaceAll("\r\n","<br>");
  mealContainer.appendChild(instructions);

  //added div to the container
  mealDiv.append(mealContainer);
  dataInfo.append(mealDiv);
}}


search.addEventListener("click", function () {
  getSearchresults();
  displayRecipes(data);
  //dataInfo.innerHTML = "";
});
var likeBtn = document.getElementById("like-button");
likeBtn.addEventListener("click", function() {
var recipeExists = false;
var favorite = JSON.parse(localStorage.getItem("favorites"))||[];
for (var i = 0; i < favorite.length; i++){
  if (favorite[i].idMeal == recipe.idMeal){
   recipeExists = true;  
  }
}
if (recipeExists == false) {
  favorite.push (recipe);
}
localStorage.setItem("favorites", JSON.stringify(favorite));  
})