const createRootElementConfig = {
  renderOption(movie) {
    const imgSRC = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSRC}" alt="movie poster" />
    <small>${movie.Title}</small> (${movie.Year})
   `
  },
  inputValue(movie){
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
}

createRootElement({
  ...createRootElementConfig,
  root: document.querySelector(".root-left"),
  onOptionSelect(movie){
    onMovieSelect(movie, document.querySelector(".summary-left"), "left")
  },
})
createRootElement({
  ...createRootElementConfig,
  root: document.querySelector(".root-right"),
  onOptionSelect(movie){
    onMovieSelect(movie,  document.querySelector(".summary-right"), "right")
  },
})

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryTarget, side) => {
  let params = {
    apikey: "47ffe9c2",
    i: movie.imdbID
   }
  const response = await fetch(`http://www.omdbapi.com/?apikey=${params.apikey}&i=${params.i}`);
  const data = await response.json();

  summaryTarget.innerHTML =  movieTemplate(data);

  if(side === "left"){
    leftMovie = data;
  } else {
    rightMovie = data;
  }

  if(leftMovie && rightMovie){
    runComparison();
  }
}

const runComparison = () => {
 const leftSideStats = document.querySelectorAll(".summary-left .stats-container");
 const rightSideStats = document.querySelectorAll(".summary-right .stats-container");

 leftSideStats.forEach((leftStat, index) => {
  const rightStat = rightSideStats[index];

  const leftSideValue = parseInt(leftStat.dataset.value);
  const rightSideValue = parseInt(rightStat.dataset.value);

  if(rightSideValue > leftSideValue){
    leftStat.classList.add("warning");
  } else {
    rightStat.classList.add("warning");
  }
 })
}

const movieTemplate = (movieDetails) => {
  const dollars = () => {
    if (movieDetails.BoxOffice = "N/A") {
      return movieDetails.BoxOffice;
    }
    return parseInt(movieDetails.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
  };

  const metaScore = parseInt(movieDetails.Metascore);

  const rating = parseFloat(movieDetails.imdbRating.replace(/,/g, ""))

  const votes = parseInt(movieDetails.imdbVotes.replace(/,/g, ""))

  const awards = movieDetails.Awards.split(' ').reduce((acc, word) => (!isNaN(parseInt(word)) ? acc += parseInt(word) : acc), 0)

  console.log(awards)

  return `
  <div class="movie-detail">
    <img src="${movieDetails.Poster}" alt="movie poster" />
    <div class="movie-content">
      <h2>${movieDetails.Title}</h2>
      <small>${movieDetails.Genre}</small>
      <p>${movieDetails.Plot}</p>
    </div>
  </div>

    <div data-value="${awards}" class="stats-container">
      <p>${movieDetails.Awards}</p>
      <small>Awards</small>
    </div>

    <div data-value="${dollars}" class="stats-container">
    <p>${movieDetails.BoxOffice}</p>
    <small>Box Office</small>
  </div>

    <div data-value="${metaScore}" class="stats-container">
      <p>${movieDetails.Metascore}</p>
      <small>Metascore</small>
    </div>

    <div data-value="${rating}" class="stats-container">
      <p>${movieDetails.imdbRating}</p>
      <small>IMDB Rating</small>
    </div>

    <div data-value="${votes}" class="stats-container">
      <p>${movieDetails.imdbVotes}</p>
      <small>IMDB Votes</small>
    </div>
  `
}
