// const recipes = [];

// function getSearchresults() {
//   fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
//     .then((response) => response.json())
//     .then((data) => (recipes = data));
// }

// getSearchresults();

// document.querySelectorAll(".list li a").forEach((link) => {
//   link.addEventListener("click", () => {
//     const recipeId = link.href.split("/")[2];
//     localStorage.setItem("recipeId", recipeId);
//     window.location.href = "/recipe/" + recipeId;
//   });
// });

// const heartButton = document.querySelector(".heart");

// heartButton.addEventListener("click", () => {
//   // Increment the counter variable.
//   let count = localStorage.getItem("count") || 0;
//   count++;
//   localStorage.setItem("count", count);

//   // Toggle the heart button's class to indicate that it has been clicked.
//   heartButton.classList.toggle("heart-clicked");
// });
//  <section class="favoriteCard is-2">
//   <section class="favImage">
//     <a id="removeBtn" class="button is-light m-4">Remove</a>
//   </section>
//   <section id="randomRecipe" class="recipeCard">
//     <section class="media">
//       <section class="media-left">
//         <img id="image" class="image" alt="Meal Photograph" />
//       </section>
//       <section
//         id="ingredients"
//         class="ingredientFont has-text-weight-bold has-text-warning-light is-size-5"
//       ></section>
//     </section>

//     <section
//       id="instructions"
//       class="instructionsFont has-text-weight-bold is-size-5 has-text-warning-light m-2"
//     >
//       <h2
//         class="title is-3 columns is-centered mb-6 has-text-warning-light"
//       >
//         Instructions
//       </h2>
//       <p
//         id="instructionsText"
//         class="instructionsText has-text-warning-light is-size-5"
//       ></p>
//     </section>
//   </section>
// </section>
// trying to make cards from local storage
window.addEventListener("load", function () {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  for (let i = 0; i <= favorites.length; i++) {
    console.log(favorites[i]);
    // document.querySelectorAll(".columns")[1];
    var recName = favorites[index].strMeal;
    var pic = favorites[index].strMealThumb;
  }
});
