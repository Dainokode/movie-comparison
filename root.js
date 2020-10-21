const createRootElement = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
root.innerHTML = `
<div class="dropdown">
  <input type="text" placeholder="Search for a movie">
  <div class="dropdown-content hidden">
  </div>
</div>
`

const input = root.querySelector("input");
const dropdown = root.querySelector(".dropdown");
const dropdownContent = root.querySelector(".dropdown-content");

const onInput = async (e) => {
 const items = await fetchData(e.target.value);
 dropdownContent.innerHTML = "";

 dropdownContent.classList.remove("hidden");

 for (let item of items){

  const a = document.createElement("a");


  a.innerHTML = renderOption(item);

  a.addEventListener("click", (e) => {
    input.value = inputValue(item);
    onOptionSelect(item)
  })

  dropdownContent.appendChild(a);
 }
}

input.addEventListener("input", debounce(onInput, 500));
}