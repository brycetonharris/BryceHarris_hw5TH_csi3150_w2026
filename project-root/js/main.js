const container = document.getElementById("carContainer");
const noResults = document.getElementById("noResults");

function displayCars(cars){

container.innerHTML = "";

cars.forEach(car => {

const card = document.createElement("div");
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
const make = document.getElementById("make").value;
const color = document.getElementById("color").value;

let filtered = usedCars.filter(car => {

return (!minYear || car.year >= minYear) &&
(!maxYear || car.year <= maxYear) &&
(!maxMileage || car.mileage <= maxMileage) &&
(!minPrice || car.price >= minPrice) &&
(!maxPrice || car.price <= maxPrice) &&
(!make || car.make === make) &&
(!color || car.color === color);

});

if(filtered.length === 0){
container.innerHTML = "";
noResults.innerText = "No cars found. Try different filters.";
}else{
noResults.innerText = "";
displayCars(filtered);
}

}

displayCars(usedCars);