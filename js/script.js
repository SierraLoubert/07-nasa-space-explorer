const apiKey = "YOUR_API_KEY";
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
const gallery = document.getElementById("gallery");
const button = document.getElementById("getImagesBtn");

button.addEventListener("click", getSpaceImages);

const response = await fetch(url);
const data = await response.json();
gallery.innerHTML = "<p>🔄 Loading space photos...</p>";

gallery.innerHTML = "";

data.forEach(photo => {
  const card = document.createElement("div");
card.classList.add("gallery-item");

card.innerHTML = `
<img src="${photo.url}" alt="${photo.title}">
<h3>${photo.title}</h3>
<p>${photo.date}</p>
`;

gallery.appendChild(card);
});
// This sets up the date pickers to:
async function getSpaceImages() {

}
const startDate = startInput.value;
const endDate = endInput.value;
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

try{

}
catch(error){
    gallery.innerHTML =
    "<p>Something went wrong.</p>";
}
//facts
const facts = [
"One day on Venus is longer than one year.",
"The Sun contains 99.8% of the Solar System's mass.",
"There are more stars than grains of sand on Earth."
];

const url =
`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;