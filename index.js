//declaring  variabales including apis ids and keys
const searchForm = document.querySelector("#search-bar");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const searchList = document.querySelector("#searchesList");
let searchQuery = "";

let searches = JSON.parse(localStorage.getItem("searches")) || [];

const APP_ID = "6e800d82";
const APP_key_recipe = "c5603f4821b4f87ae1e3dafcda7b328d";
const APP_youtube = "AIzaSyDePJu7r8npNaIknsEXLRUTajXIxst0Cf0";
//Submit listener for search bar and it's local storage
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;

  if (searches.indexOf(searchQuery) === -1) {
    searches.push(searchQuery);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  // Displaying local storage in list format
  searchList.innerHTML = searches
    .map((search) => {
      return `<li class="search-list">${search} </li>`;
    })
    .join("");
  console.log(localStorage);

  fetchAPI(searchQuery);
});
// Fetch Function for Recipe Api
async function fetchAPI(searchQuery) {
  const baseRecipeURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key_recipe}&to=10&type=public`;
  const response = await fetch(baseRecipeURL);
  console.log(response);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
// Fetch Function for youtube Api
async function searchYouTube(event) {
  console.log(event.target.dataset.source);
  D;
  const baseYouTubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${event.target.dataset.source}&type=video&key=${APP_youtube}`;
  console.log(baseYouTubeURL);
  const response = await fetch(baseYouTubeURL);

  // Looking at fetch data and saving in variables to be used for HTML
  const data = await response.json();
  console.log(data);
  const videoId = data.items[0].id.videoId;
  const url = `https://youtube.com/watch/${videoId}`;
  $(".relative-video").attr("href", `https://youtube.com/watch/${videoId}`);
  console.log(url);
}

// Using Fetch Data from both Apis and populating inside HTML
function generateHTML(results) {
  console.log(results);
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += ` 
  
    
       <div class="column is-4 is-centered card">
    
          <h1 class="title  centered">${result.recipe.label}</h1>
          <div  class="item image">
        <img src="${result.recipe.image}" alt="">
       </div>
       
<p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
       <p class="title is-size-5 ">${
         result.recipe.dietLabels.length > 0
           ? result.recipe.dietLabels
           : "No Data Found"
       }</p> 
          <p class="title is-size-7">${result.recipe.healthLabels.slice(
            0,
            6
          )}</p>

       <div >
          <a class="view-button button is-link" href="${
            result.recipe.url
          }"target="_blank">View Recipe</a> <br>
<br>
    
          <a class="relative-video button is-link" data-source="${
            result.recipe.label
          }" href="#"  >Relative Video</a>
       </div>
       </div>
      
       
       
       `;
  });
  searchResultDiv.innerHTML = generatedHTML;

  // open a new link on youtube when the button is clicked for video search
  $(".relative-video").click(searchYouTube);
}
