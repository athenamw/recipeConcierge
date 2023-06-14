const recipes = [];

function getSearchresults() {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(response => response.json())
    .then(data => recipes = data);
}

getSearchresults();

document.querySelectorAll('.list li a').forEach(link => {
  link.addEventListener('click', () => {
    const recipeId = link.href.split('/')[2];
    localStorage.setItem('recipeId', recipeId);
    window.location.href = '/recipe/' + recipeId;
  });
});

const heartButton = document.querySelector(".heart");

heartButton.addEventListener("click", () => {
  // Increment the counter variable.
  let count = localStorage.getItem("count") || 0;
  count++;
  localStorage.setItem("count", count);

  // Toggle the heart button's class to indicate that it has been clicked.
  heartButton.classList.toggle("heart-clicked");
});