const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("searchBtn");
var input = document.getElementById("searchText").value;
const dailyBtn = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");
var recipeName = document.getElementById("recipeName");
var img = document.getElementById("image");
var ingredients = document.getElementById("ingredients");
var instructions = document.getElementById("instructionsText");

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
    "has-text-black-bis"
  );
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var recipe = data.meals[0];
        recipeName.textContent = recipe.strMeal;
        img.src = recipe.strMealThumb;
        var ingredientList = recipe.strMeasure;
        var measure = recipe.strIngredient;
        // loop for getting the measurement and the ingredients paired up
        for (let i = 1; i <= 20; i++) {
          var ingredientKey = "strIngredient" + i;
          var ingredientValue = recipe[ingredientKey];
          console.log(ingredientValue);
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
  var mainSearchApi =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  //calls the api
  fetch(mainSearchApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayTitle(data);
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
function displayTitle(data){
console.log(data);
let dataInfo = document.getElementById("data");
let mealDiv = document.createElement("div");

// append the name to a new div
//need to add a class to each div
for (let i = 0; i< data.meals.length; i++) {
  let mealName = document.createElement("div");
  
  mealName.textContent = data.meals[i].strMeal;
  mealDiv.append(mealName);
}
console.log(mealDiv);
dataInfo.append(mealDiv);
}

function displayImage(data, event){
  let mealDiv = document.createElement("section");
  
  // append the name to a new div
  //need to add a class to each div
  for (let i = 0; i< data.meals.length; i++) {
    let mealName = document.createElement("section");
    //mealName.id = "recipes" + i;
    mealName.setAttribute("id", `recipes ${i}`);
    console.log(mealName);
  
    mealName.textContent = data.meals[i].strMeal;
    mealDiv.append(mealName);
  }

  console.log(mealDiv);
  dataInfo.append(mealDiv);

  
  event.target.value.addEventListener("target", function(){

  });

  }




search.addEventListener("click", function () {
  getSearchresults();
});
