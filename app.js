let params = {
 apikey: "47ffe9c2",
 s: "batman"
}

const fetchData = async () => {
 const response = await fetch(`http://www.omdbapi.com/?apikey=${params.apikey}&s=${params.s}`);
 const data = await response.json();
 console.log(data);
}

fetchData();
