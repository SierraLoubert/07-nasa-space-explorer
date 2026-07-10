const apiKey = "9DmCkeH1fNTXXpcOh0OJLoY9oJiHDIOGPqW9Sp4z";

const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const gallery = document.getElementById("gallery");
const button = document.getElementById("getImagesBtn");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalVideoContainer = document.getElementById("modalVideoContainer");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");
const modalVideoLink = document.getElementById("modalVideoLink");
const closeModalBtn = document.getElementById("closeModalBtn");

setupDateInputs(startInput, endInput);

button.addEventListener("click", getSpaceImages);

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeImageModal);
}

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target.matches("[data-modal-close]")) {
            closeImageModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeImageModal();
    }
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
});

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

function getYouTubeVideoId(url) {
    const regExp =
        /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[1].length === 11 ? match[1] : "";
}

function getYouTubeThumbnail(url) {
    const videoId = getYouTubeVideoId(url);

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

function getYouTubeEmbedUrl(url) {
    const videoId = getYouTubeVideoId(url);

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

function getVideoEmbedUrl(url) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return getYouTubeEmbedUrl(url);
    }

    return "";
}

function openImageModal(photo) {
    if (!modal || !modalImage || !modalVideoContainer || !modalVideo || !modalTitle || !modalDate || !modalExplanation || !modalVideoLink) {
        return;
    }

    const formattedDate = dateFormatter.format(new Date(`${photo.date}T00:00:00`));
    const isVideo = photo.media_type === "video";
    const videoEmbedUrl = isVideo ? getVideoEmbedUrl(photo.url) : "";

    modalImage.hidden = isVideo;
    modalVideoContainer.hidden = !isVideo;
    modalVideoLink.hidden = true;
    modalVideo.src = "";

    if (isVideo && videoEmbedUrl) {
        modalVideo.src = videoEmbedUrl;
    } else if (isVideo) {
        modalVideoLink.hidden = false;
        modalVideoLink.innerHTML = `<a href="${photo.url}" target="_blank" rel="noopener noreferrer">Open video in a new tab</a>`;
    }

    if (!isVideo) {
        modalImage.src = photo.hdurl || photo.url;
        modalImage.alt = photo.title;
    } else {
        modalImage.src = "";
        modalImage.alt = "";
    }

    modalTitle.textContent = photo.title;
    modalDate.textContent = `Date: ${formattedDate}`;
    modalExplanation.textContent = photo.explanation;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeImageModal() {
    if (!modal || !modalVideo) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalVideo.src = "";
}

async function getSpaceImages() {

    const startDate = startInput.value;
    const endDate = endInput.value;

    const url =
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

    gallery.innerHTML = `
    <div class="placeholder">
        <div class="spinner"></div>
        <p>Loading NASA images...</p>
    </div>
    `;

    try {
        const response = await fetch(url);
        const data = await response.json();

        gallery.innerHTML = "";

        data.forEach(photo => {
            console.log(photo);
            const card = document.createElement("div");
            card.classList.add("gallery-item");
            const postedDate = dateFormatter.format(new Date(`${photo.date}T00:00:00`));

            const isVideo = photo.media_type === "video";
            const videoThumbnail = photo.thumbnail_url || getYouTubeThumbnail(photo.url);
            const mediaContent = isVideo
                ? videoThumbnail
                    ? `<button type="button" class="media-button"><img src="${videoThumbnail}" alt="Thumbnail for ${photo.title}"></button>`
                    : `<p><button type="button" class="text-button">Watch video</button></p>`
                : `<img src="${photo.url}" alt="${photo.title}">`;

            const titleContent = isVideo
                ? `<h3><button type="button" class="text-button">${photo.title}</button></h3>`
                : `<h3>Title: ${photo.title}</h3>`;

            card.innerHTML = `
                    ${mediaContent}
                    ${titleContent}
                <p>Posted: ${postedDate}</p>
            `;

            if (photo.media_type === "image") {
                const image = card.querySelector("img");

                if (image) {
                    image.addEventListener("click", () => openImageModal(photo));
                }
            }

            if (photo.media_type === "video") {
                card.querySelectorAll("button").forEach(buttonElement => {
                    buttonElement.addEventListener("click", () => openImageModal(photo));
              
                
                });
            } 

            gallery.appendChild(card);
        });

    } catch (error) {
        gallery.innerHTML = "<p>Something went wrong.</p>";
    }
}