const fetchData = async (searchTerm) => {
 let params = {
  apikey: "47ffe9c2",
  s: searchTerm
 }

 const response = await fetch(`http://www.omdbapi.com/?apikey=${params.apikey}&s=${params.s}`);
 const data = await response.json();

 if(data.Error){
  return [];
 }

 return data.Search
}

const wrapper = document.querySelector(".wrapper");
wrapper.innerHTML = `
<div class="dropdown">
  <input type="text" placeholder="Search for a movie">
  <div class="dropdown-content hidden">
  </div>
</div>
`

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");

const onInput = async (e) => {
 const movies = await fetchData(e.target.value);
 dropdownContent.innerHTML = "";

 dropdownContent.classList.remove("hidden");

 for (let movie of movies){

  const a = document.createElement("a");
  const imgSRC = movie.Poster === "N/A" ? "" : movie.Poster;

  a.innerHTML = `
   <img src="${imgSRC}" alt="movie poster" />
   <small>${movie.Title}</small>
  `;

  a.addEventListener("click", (e) => {
    input.value = movie.Title;
    onMovieSelect(movie);
  })

  dropdownContent.appendChild(a);
 }
}

input.addEventListener("input", debounce(onInput, 500));

const onMovieSelect = async (movie) => {
  let params = {
    apikey: "47ffe9c2",
    i: movie.imdbID
   }
  const response = await fetch(`http://www.omdbapi.com/?apikey=${params.apikey}&i=${params.i}`);
  const data = await response.json();
  document.querySelector("#test").innerHTML =  movieTemplate(data);
}

const movieTemplate = (movieDetails) => {
  return `
  <div class="movie-detail">
    <img src="${movieDetails.Poster}" alt="movie poster" />
    <div class="movie-content">
      <h2>${movieDetails.Title}</h2>
      <small>${movieDetails.Genre}</small>
      <p>${movieDetails.Plot}</p>
    </div>
  </div>

    <div class="stats-container">
      <p>${movieDetails.Awards}</p>
      <small>Awards</small>
    </div>

    <div class="stats-container">
      <p>${movieDetails.Metascore}</p>
      <small>Metascore</small>
    </div>

    <div class="stats-container">
      <p>${movieDetails.imdbRating}</p>
      <small>IMDB Rating</small>
    </div>

    <div class="stats-container">
      <p>${movieDetails.imdbVotes}</p>
      <small>IMDB Votes</small>
    </div>
  `
}
