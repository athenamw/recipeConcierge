const randomRecipeApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const search = document.getElementById("searchBtn");
const daily = document.getElementById("daily");
const randomDaily = document.getElementById("randomRecipe");
var input = document.getElementById("searchText").value;

daily.addEventListener("click", function () {
  fetch(randomRecipeApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.meals);
      });
    }
  });
});

const generateMeal = function (input) {};

var getSearchresults = function() {
  //will grab the input from the user for the search
  var input = document.getElementById("searchText").value;

  //localStorage.setItem("searchText",input);

  var mainSearchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  //calls the api
  fetch(mainSearchApi)
  .then(function(response) {
    if (response.ok){
      response.json().then(function(data) {
        console.log(data);

      });
      //will run if it cant call the api
    } else {
      console.log("error");
    }
  })
  //will run if it cant connect to the server
  .catch(function(error) {
    console.log("error");
  });
  //console logs th user input
  console.log(input);
};

search.addEventListener("click", function (){
getSearchresults();
});