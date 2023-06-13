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