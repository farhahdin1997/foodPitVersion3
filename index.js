const searchForm = document.querySelector("#search-bar");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const searchList = document.querySelector('#searchesList')
let searchQuery = "";

let searches= JSON.parse(localStorage.getItem("searches"))|| []

const APP_ID = "753e732f";
const APP_key_recipe = "919bc78d8050b9b0caf8f5423c444aa1";
const APP_youtube = "AIzaSyDePJu7r8npNaIknsEXLRUTajXIxst0Cf0";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  
  if (searches.indexOf(searchQuery)=== -1) {
    searches.push(searchQuery)
    localStorage.setItem('searches',JSON.stringify(searches))
  }
  
  searchList.innerHTML=
searches.map(search => {
    return `<li class="search-list">${search} </li>`
}).join('')
console.log(localStorage)

  fetchAPI(searchQuery);
});
async function fetchAPI(searchQuery) {
  const baseRecipeURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key_recipe}&to=10&type=public`;
  const response = await fetch(baseRecipeURL);
  console.log(response);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
async function searchYouTube(event) {
  console.log(event.target.dataset.source);
  const baseYouTubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${event.target.dataset.source}&type=video&key=${APP_youtube}`;
  console.log(baseYouTubeURL);
  const response = await fetch(baseYouTubeURL);

  const data = await response.json();
  console.log(data);
  const videoId = data.items[0].id.videoId;
  const url = `https://youtube.com/watch/${videoId}`;
  $(".relative-video").attr("href", `https://youtube.com/watch/${videoId}`);
  console.log(url);
}


// let searches= JSON.parse(localStorage.getItem("searches"))|| []




function generateHTML(results) {
  console.log(results);
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += ` 
    <container class="columns"> 
    <div class="column">
       <div>
    
          <h1 class="title">${result.recipe.label}</h1>
          <div  class="item">
        <img src="${result.recipe.image}" alt="">
       </div>

       <div >
          <a class="view-button" href="${
            result.recipe.url
          }"target="_blank">View Recipe</a> <br>

    
          <a class="relative-video" data-source="${
            result.recipe.label
          }" href="#" >Relative Video</a>
       </div>
       </div>
       </container>
       
       `;
  });
  searchResultDiv.innerHTML = generatedHTML;

  // open a new link on youtube when the button is clicked for video search
  $(".relative-video").click(searchYouTube);
}


// async function searchYouTube(searchQuery){
//   const baseYouTubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=AIzaSyDePJu7r8npNaIknsEXLRUTajXIxst0Cf0`;
//   const response = await fetch(baseYouTubeURL);
//   console.log(response);
//   const data = await response.json();

//   console.log(data)
// }



