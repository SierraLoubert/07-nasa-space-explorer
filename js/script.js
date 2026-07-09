const apiKey = "9DmCkeH1fNTXXpcOh0OJLoY9oJiHDIOGPqW9Sp4z";

const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const gallery = document.getElementById("gallery");
const button = document.getElementById("getImagesBtn");

setupDateInputs(startInput, endInput);

button.addEventListener("click", getSpaceImages);

const spaceFacts = [

"Did you know? A day on Venus is longer than a year on Venus.",

"Did you know? Neutron stars can spin 600 times every second.",

"Did you know? There are more stars than grains of sand on Earth.",

"Did you know? Jupiter has over 90 known moons.",

"Did you know? One million Earths could fit inside the Sun."

];

const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

const factBox =
document.getElementById("spaceFact");

if (factBox) {
    factBox.textContent = `Fun Fact: ${randomFact}`;
}

async function getSpaceImages() {

    const startDate = startInput.value;
    const endDate = endInput.value;

    const url =
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

    gallery.innerHTML = "<p>🔄 Loading space photos...</p>";

    try {
        const response = await fetch(url);
        const data = await response.json();

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

            if(photo.media_type === "image"){

    card.innerHTML = `
        <img src="${photo.url}">
        <h3>${photo.title}</h3>
        <p>${photo.date}</p>
    `;

}else{

    card.innerHTML = `
        <h3>${photo.title}</h3>
        <p>${photo.date}</p>
        <a href="${photo.url}" target="_blank">
            Watch NASA Video
        </a>
    `;

}
        });

    } catch (error) {
        gallery.innerHTML = "<p>Something went wrong.</p>";
    }
}