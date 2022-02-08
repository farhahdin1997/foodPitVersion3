const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";


const APP_ID = "753e732f";
const APP_key_recipe = "919bc78d8050b9b0caf8f5423c444aa1";
const APP_youtube= "AIzaSyDePJu7r8npNaIknsEXLRUTajXIxst0Cf0"



searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
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
async function searchYouTube(event){
  console.log(event.target.dataset.source)
  const baseYouTubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${event.target.dataset.source}&type=video&key=${APP_youtube}`;
  console.log(baseYouTubeURL)
  const response = await fetch(baseYouTubeURL);

  const data= await response.json();
  console.log(data)
  const videoId= data.items[0].id.videoId
  const url= `https://youtube.com/watch/${videoId}`
  $('.relative-video').attr( 'href', `https://youtube.com/watch/${videoId}`)
  console.log(url)
}

function generateHTML(results) {
  console.log(results)
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `  <div class="item">
        <img src="${result.recipe.image}" alt="">
       </div>
       <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          
          <a class="view-button" href="${
            result.recipe.url
          }"target="_blank">View Recipe</a> <br>

    
          <a class="relative-video" data-source="${result.recipe.label}" >Relative Video</a>

          <a class="relative-video" href="#">Relative Video</a>

       </div>
       <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
       <p class="title is-size-5 ">${
         result.recipe.dietLabels.length > 0
           ? result.recipe.dietLabels
           : "No Data Found"
       }</p> 
          <p class="title is-size-5">${result.recipe.healthLabels}</p> 
       
       `;
  });
  searchResultDiv.innerHTML = generatedHTML;
  $(".relative-video").click(searchYouTube)
}


// async function searchYouTube(searchQuery){
//   const baseYouTubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=AIzaSyDePJu7r8npNaIknsEXLRUTajXIxst0Cf0`;
//   const response = await fetch(baseYouTubeURL);
//   console.log(response);
//   const data = await response.json();
 
//   console.log(data)
// }



