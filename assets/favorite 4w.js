const recipes = "https:www.themealdb.com/api/json/v1/1/search.php?s=";
const rdmrecipes = "https://www.themealdb.com/api/json/v1/1/random.php";

window.addEventListener("load", function () {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  var favoritesSection = document.getElementById("favMini");
  for (let i = 0; i < favorites.length; i++) {
    console.log(favorites[i]);
    var recName = favorites[i].strMeal;
    var pic = favorites[i].strMealThumb;
    let mealDiv = document.createElement("section");

    let mealContainer = document.createElement("section");
    mealContainer.id = "recipe " + i;
    let mealName = document.createElement("h2");
    mealName.id = "recName " + i;

    let measurements = document.createElement("div");
    measurements.id = "ingredients";

    let image = document.createElement("img");
    image.id = "recipe";
    image.src = pic;
    image.alt = "Meal Photograph";

    let instructions = document.createElement("p");
    instructions.id = "instructions";

    mealName.textContent = recName;
    mealContainer.appendChild(mealName);

    image.textContent = pic;
    mealContainer.appendChild(image);

    for (var j = 1; j <= 20; j++) {
      var ingredientKey = "strIngredient" + j;
      var ingredientValue = favorites[i][ingredientKey];
      var measureKey = "strMeasure" + j;
      var measureValue = favorites[i][measureKey];
      if (ingredientValue && measureValue) {
        let ingredientContainer = document.createElement("div");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredient";
        checkbox.value = ingredientValue;
        checkbox.id = `ingredient_${i}_${j}`;

        checkbox.addEventListener("change", function () {
          updateSelectedIngredients();
        });

        let label = document.createElement("label");
        label.setAttribute("for", `ingredient_${i}_${j}`);
        label.textContent = `${measureValue} of ${ingredientValue}`;

        ingredientContainer.appendChild(checkbox);
        ingredientContainer.appendChild(label);

        measurements.appendChild(ingredientContainer);
      }
    }
    instructions.innerHTML =
      "Instructions<br>" +
      favorites[i].strInstructions.replaceAll("\r\n", "<br>");
    mealContainer.appendChild(measurements);
    mealContainer.appendChild(instructions);

    mealDiv.append(mealContainer);
    favoritesSection.append(mealDiv);
  }

    // Load the selected ingredients from local storage
    loadSelectedIngredients();

  // Check if any ingredient is selected and show/hide the "Find Stores" button
  var selectedIngredients = getSelectedIngredients();
  if (selectedIngredients.length > 0) {
    showFindStoresButton();
  } else {
    hideFindStoresButton();
  }
}); 

function updateSelectedIngredients() {
  var selectedIngredients = getSelectedIngredients();
  storeSelectedIngredients(selectedIngredients);

  // Show/hide the "Find Stores" button based on the selection
  if (selectedIngredients.length > 0) {
    showFindStoresButton();
  } else {
    hideFindStoresButton();
  }
}


function showFindStoresButton() {
  var findStoresBtn = document.getElementById("findStoresBtn");
  if (!findStoresBtn) {
    // Create the "Find Stores" button
    findStoresBtn = document.createElement("button");
    findStoresBtn.id = "findStoresBtn";
    findStoresBtn.textContent = "Find Stores";

    // Add event listener for button click
    findStoresBtn.addEventListener("click", function (event) {
      var selectedIngredients = getSelectedIngredients();
      storeSelectedIngredients(selectedIngredients);
      initMap(selectedIngredients);
      var searchTerm = document.getElementById("location-input").value;
      console.log(searchTerm);
      searchRecipes(searchTerm);

      // Load the Google Maps API asynchronously
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCV5hVdqw7aeWJDh9p9b8vjlK4kfzbhPs8&libraries=places&callback=initMap";
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
    });

    // Append the button to the desired location in the DOM
    var buttonContainer = document.getElementById("buttonContainer");
    if (buttonContainer) {
      buttonContainer.appendChild(findStoresBtn);
    }
  }

  findStoresBtn.style.display = "inline-block";
}

function hideFindStoresButton() {
  var findStoresBtn = document.getElementById("findStoresBtn");
  if (findStoresBtn) {
    findStoresBtn.style.display = "none";
  }
}


function getSelectedIngredients() {
  var selectedIngredients = [];
  var checkboxes = document.querySelectorAll('input[name="ingredient"]:checked');
  checkboxes.forEach(function (checkbox) {
    selectedIngredients.push(checkbox.value);
  });
  return selectedIngredients;
}

function storeSelectedIngredients(selectedIngredients) {
  localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
}

function loadSelectedIngredients() {
  var selectedIngredients = JSON.parse(localStorage.getItem("selectedIngredients"));
  if (selectedIngredients && selectedIngredients.length > 0) {
    var checkboxes = document.querySelectorAll('input[name="ingredient"]');
    checkboxes.forEach(function (checkbox) {
      if (selectedIngredients.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }
}


function initMap(selectedIngredients) {
  const infowindow = new google.maps.InfoWindow();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
  });

  const service = new google.maps.places.PlacesService(map);

  const requests = selectedIngredients.map((ingredient) => ({
    query: ingredient,
    fields: ["name", "geometry"],
  }));

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const userLocation = new google.maps.LatLng(latitude, longitude);

      map.setCenter(userLocation);

      Promise.all(
        requests.map((request) => {
          return new Promise((resolve, reject) => {
            service.textSearch(request, (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results &&
                results.length > 0
              ) {
                resolve(results);
              } else {
                reject(new Error("PlacesService request failed"));
              }
            });
          });
        })
      )
        .then((resultsArray) => {
          const locationsContainer = document.getElementById(
            "locations-container"
          );
          if (!locationsContainer) {
            console.log("Error: 'locations-container' element not found.");
            return;
          }

          locationsContainer.innerHTML = ""; // Clear previous results
          const flattenResultsArray = resultsArray.flat();
          // resultsArray.forEach((results) => {
            // for (let i = 0; i < results.length; i++) {
              displaySearchResults(flattenResultsArray);
              // createMarker(results[i], map);
              // const locationItem = document.createElement("div");
              // locationItem.textContent = results[i].name;
              // locationsContainer.appendChild(locationItem);
            // }
          // });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    (error) => {
      console.log("Error retrieving location:", error);
    }
  );
}


function createMarker(place, map) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map, marker);
  });
}



// Find the location input element
var locationInput = document.getElementById("location-input");

// Check if the element exists before accessing its value
if (locationInput) {
  var location = locationInput.value;
  console.log(location);
  // Rest of your code that relies on the location value
} else {
  console.error("Element with ID 'location-input' not found.");
}

var currentPage=0;
function dispalyNextPage(){
  var pageItems = document.querySelectorAll(".location-item");
  pageItems.forEach(function (pageItem) {
    pageItem.style.display = "none";
  });
  pageItems = document.querySelectorAll(".location-item[data-page='" + currentPage + "']");
  console.log(pageItems, currentPage);
  pageItems.forEach(function (pageItem) {
  pageItem.style.display = "block";
  });
};

function displaySearchResults(results, pagination) {
  var locationsContainer = document.getElementById("locations-container");
  locationsContainer.innerHTML = ""; // Clear the container before adding new results

  results.forEach(function (place, index) {

    var locationItem = document.createElement("div");
    locationItem.classList.add("location-item");
    locationItem.dataset.page= Math.floor(index / 5);
    locationItem.style.display = "none";
    // Create an image container
    var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Create an image element
    var image = document.createElement("img");
    image.src = place.photos?.[0]?.getUrl();
    image.alt = "Location Photo";
    imageContainer.appendChild(image);

    // Create a details container
    var detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    // Create a title element
    var title = document.createElement("h3");
    title.textContent = place.name;

    // Create an address element
    var address = document.createElement("p");
    address.textContent = place.formatted_address;

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(address);

    locationItem.appendChild(imageContainer);
    locationItem.appendChild(detailsContainer);

    locationsContainer.appendChild(locationItem);

    console.log(place);


  });

  currentPage=0;
  dispalyNextPage();

  // Display pagination
  var paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  // pagination.forEach(function (page) {
    for (let i = 0; i <= Math.floor(results.length / 5); i++) {
    var pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i+1;
    pageLink.dataset.page = i;
    pageLink.addEventListener("click", function () {
      currentPage = parseInt(this.dataset.page);
      dispalyNextPage();
    });

    paginationContainer.appendChild(pageLink);
  };
}




// // Create the locations container
// const locationsContainer = document.createElement("div");
// locationsContainer.id = "locations-container";

// // Create the pagination container
// const paginationContainer = document.createElement("div");
// paginationContainer.id = "pagination-container";

// // Get a reference to the body element
// const body = document.querySelector("body");

// // // Append the containers to the body
// body.appendChild(paginationContainer);
// body.appendChild(locationsContainer);
