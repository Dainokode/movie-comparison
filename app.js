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
  <input type="text" placeholder="Search movie">
  <div class="dropdown-content hidden">
  </div>
</div>
`

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");

const onInput = async (e) => {
 const movies = await fetchData(e.target.value);

 dropdownContent.classList.remove("hidden");

 for (let movie of movies){
  const a = document.createElement("a");
  a.innerHTML = `
   <img src="${movie.Poster}" alt="movie poster" />
   <small>${movie.Title}</small>
  `;

  dropdownContent.appendChild(a);
 }
}
input.addEventListener("input", debounce(onInput, 500));

fetchData();
