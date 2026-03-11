const container = document.getElementById("carContainer");
const noResults = document.getElementById("noResults");
const filterForm = document.getElementById("filterForm");
const makeSelect = document.getElementById("make");
const colorSelect = document.getElementById("color");

function populateSelect(select, values) {
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All";
  select.appendChild(allOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function getSelectedValues(select) {
  return Array.from(select.selectedOptions)
    .map((option) => option.value)
    .filter(Boolean);
}

populateSelect(
  makeSelect,
  [...new Set(usedCars.map((car) => car.make))].sort()
);
populateSelect(
  colorSelect,
  [...new Set(usedCars.map((car) => car.color))].sort()
);

function displayCars(cars){

container.innerHTML = "";

cars.forEach(car => {

const card = document.createElement("article");
card.classList.add("car-card");

card.innerHTML = `
<h3>${car.year} ${car.make} ${car.model}</h3>
<p>Mileage: ${car.mileage}</p>
<p>Price: $${car.price}</p>
<p>Color: ${car.color}</p>
<p>${car.gasMileage}</p>
`;

container.appendChild(card);

});
}

function filterCars(){

const minYear = document.getElementById("minYear").value;
const maxYear = document.getElementById("maxYear").value;
const maxMileage = document.getElementById("maxMileage").value;
const minPrice = document.getElementById("minPrice").value;
const maxPrice = document.getElementById("maxPrice").value;
const selectedMakes = getSelectedValues(makeSelect);
const selectedColors = getSelectedValues(colorSelect);

let filtered = usedCars.filter(car => {

return (!minYear || car.year >= minYear) &&
(!maxYear || car.year <= maxYear) &&
(!maxMileage || car.mileage <= maxMileage) &&
(!minPrice || car.price >= minPrice) &&
(!maxPrice || car.price <= maxPrice) &&
(!selectedMakes.length || selectedMakes.includes(car.make)) &&
(!selectedColors.length || selectedColors.includes(car.color));

});

if(filtered.length === 0){
container.innerHTML = "";
noResults.innerText = "No cars found. Try different filters.";
}else{
noResults.innerText = "";
displayCars(filtered);
}

}

filterForm.addEventListener("submit", (event) => {
event.preventDefault();
filterCars();
});

displayCars(usedCars);
