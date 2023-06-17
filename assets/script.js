const randomRecipeApi = 'https://www.themealdb.com/api/json/v1/1/random.php';
const search = document.getElementById('searchBtn');
var input = document.getElementById('searchText').value;
var searchTextBox = document.getElementById('searchText');
const dailyBtn = document.getElementById('daily');
const randomDaily = document.getElementById('randomRecipe');
var recipeName = document.getElementById('recipeName');
var img = document.getElementById('image');
var ingredients = document.getElementById('ingredients');
var instructions = document.getElementById('instructionsText');
var randomContainer = document.getElementById('container');
var likeBtn = document.getElementById('like-button');
let dataInfo = document.getElementById('data');

function getRandomRecipe() {
  changeLikeButtonIcon('unlike');
  // added this innerHTML because ingredients were not clearing on button clicks. Now refreshes to current recipe
  ingredients.innerHTML = `<h2>Ingredients</h2>`;
  // only applies to h2 which is the first child
  ingredients.firstChild.classList.add('title', 'is-2', 'columns', 'is-centered', 'm-4', 'has-text-warning-light');
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var recipe = data.meals[0];
        recipeName.textContent = recipe.strMeal;
        img.src = recipe.strMealThumb;
        var ingredientList = recipe.strMeasure;
        var measure = recipe.strIngredient;
        likeBtn.textContent = getLikeButtonTextContent(recipe);
        likeBtn.addEventListener('click', function () {
          handleLikeButtonClick(recipe);
        });
        // loop for getting the measurement and the ingredients paired up
        for (let i = 1; i <= 20; i++) {
          var ingredientKey = 'strIngredient' + i;
          var ingredientValue = recipe[ingredientKey];
          var measureKey = 'strMeasure' + i;
          var measureValue = recipe[measureKey];
          // displays the values under the photo
          if (ingredientValue && measureValue) {
            ingredients.innerHTML += `<p>${measureValue} of ${ingredientValue}</p>`;
          }
        }
        // added replace all because the instructions were running together
        var recipeInstructions = recipe.strInstructions.replaceAll('\r\n', '<br>');
        // displays the instructions under the ingredients
        instructions.innerHTML = recipeInstructions;
      });
    }
  });
}
// generates random recipe on page load
window.addEventListener('load', getRandomRecipe);
// generates random recipe on button click
dailyBtn.addEventListener('click', getRandomRecipe);

function getSearchresults() {
  //will grab the input from the user for the search
  var input = document.getElementById('searchText').value;

  //localStorage.setItem("searchText",input);
  var mainSearchApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + input;
  //calls the api
  fetch(mainSearchApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRecipes(data);
          //console.log(data);
        });
        //will run if it cant call the api
      } else {
        console.log('Error: Cannot reach The Meal DB API');
      }
    })
    //will run if it cant connect to the server
    .catch(function (error) {
      //console.log('error');
    });
  //console logs th user input
  //console.log(input);
}

//will remove Recipe of the day and button from the page
function removeRecipeDay() {
  randomContainer.innerHTML = '.removeRecipeDay {display: none; }';
  document.head.appendChild(randomContainer);
  dailyBtn.classList.add("removeRandomRecipeBtm");

}

//will display the title when the user clicks the submit button
function displayRecipes(data) {
  let dataInfo = document.getElementById('data');
  let mealDiv = document.createElement('section');
  mealDiv.id = 'search-results';
  dataInfo.innerHTML = '';
  // append the name to a new div
  //need to add a class to each div
  //console.log('before the for loop', data.meals.length);
  for (let i = 0; i < data.meals.length; i++) {
    // console.log(data);

    let mealContainer = document.createElement('section');
    mealContainer.id = 'recipe ' + i;
    let mealName = document.createElement('h2');
    mealName.id = 'recipe-name ' + i;
    let resultsLikeBtn = document.createElement('a');
    resultsLikeBtn.textContent = getLikeButtonTextContent(data.meals[i]);
    resultsLikeBtn.classList.add('button', 'is-light', 'm-4');
    resultsLikeBtn.addEventListener('click', function () {
      handleLikeButtonClick(data.meals[i]);
    });

    mealContainer.appendChild(resultsLikeBtn);
    mealContainer.classList.add('container', 'section', 'box', 'has-text-white');
    mealName.classList.add('title', 'columns', 'is-centered');
    // create the p element for the recipe
    let measurements = document.createElement('div');
    measurements.id = 'ingredients';
    //measurements.classList.add("ingredients");makes the font to big
    measurements.innerHTML = 'Ingredients:';

    //displays the image
    let image = document.createElement('img');
    image.id = 'recipe';
    image.src = data.meals[i].strMealThumb;
    image.alt = 'Meal Photograph';
    image.classList.add('image');

    let instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.classList.add('instructions', 'has-text-white');
    mealName.textContent = data.meals[i].strMeal;
    mealContainer.appendChild(mealName);
    //add like button
    //mealContainer.appendChild(likeBtn);


    image.textContent = data.meals[i].strMealThumb;
    // appends the image to container
    mealContainer.appendChild(image);

    //will add the ingredients into the container
    for (var j = 1; j <= 20; j++) {
      var ingredientKey = 'strIngredient' + j;
      var ingredientValue = data.meals[i][ingredientKey];
      var measureKey = 'strMeasure' + j;
      var measureValue = data.meals[i][measureKey];
      // displays the values under the photo
      if (ingredientValue && measureValue) {
        measurements.innerHTML += `<p>${measureValue} of ${ingredientValue}</p>`;
        mealContainer.appendChild(measurements);
      }
    }

    instructions.innerHTML =
      '<ul>Instructions:<br>' +
      data.meals[i].strInstructions
        .replaceAll('\r\n', '<br>')
        .split('. ')
        .map((sentence) => `<li>${sentence}</li>`)
        .join('</li>') +
      '</li></ul>';
    mealContainer.appendChild(instructions);
    mealContainer.appendChild(instructions);

    //added div to the container
    mealDiv.append(mealContainer);
    dataInfo.append(mealDiv);
  }
}



// this is event listener for like button on the random recipe section
search.addEventListener('click', function () {
  removeRecipeDay();
  getSearchresults();
});
// allows enter button to be pressed on search content
searchTextBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    removeRecipeDay();
    getSearchresults();
  }
});

function checkRecipeExisting(array, meal) {
  var recipeExists = false;
  var index;
  for (var i = 0; i < array.length; i++) {
    if (array[i].idMeal == meal.idMeal) {
      recipeExists = true;
      index = i;
    }
  }
  return [recipeExists, index];
}

function changeLikeButtonIcon(likeButton) {
  if (likeButton.textContent == '😶 Like') {
    likeButton.textContent = '😋 Liked';
  } else {
    likeButton.textContent = '😶 Like';
  }
}

function handleLikeButtonClick(meal) {
  var favorite = JSON.parse(localStorage.getItem('favorites')) || [];
  let recipeInfo = checkRecipeExisting(favorite, meal);
  var recipeExists = recipeInfo[0];
  var recipeIndex = recipeInfo[1];
  if (recipeExists) {
    favorite.splice(recipeIndex, 1);
  } else {
    favorite.push(meal);
  }
  localStorage.setItem('favorites', JSON.stringify(favorite));
  changeLikeButtonIcon(this.event.target);
}

function getLikeButtonTextContent(meal) {
  var favorite = JSON.parse(localStorage.getItem('favorites')) || [];
  let recipeInfo = checkRecipeExisting(favorite, meal);
  var recipeExists = recipeInfo[0];
  if (recipeExists) {
    return '😋 Liked';
  } else {
    return '😶 Like';
  }
}
