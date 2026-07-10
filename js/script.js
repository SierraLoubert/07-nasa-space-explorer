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

ffunction openImageModal(photo) {
    if (!modal || !modalImage || !modalVideoContainer || !modalVideo || !modalTitle || !modalDate || !modalExplanation || !modalVideoLink) {
        return;
    }

    const formattedDate = dateFormatter.format(new Date(`${photo.date}T00:00:00`));
    const isVideo = photo.media_type === "video";

    // Reset modal
    modalVideo.src = "";
    modalVideoLink.hidden = true;
    modalVideoLink.innerHTML = "";

    if (isVideo) {

        // Show the video
        modalImage.hidden = true;
        modalVideoContainer.hidden = false;

        // NASA already gives an embed URL
        modalVideo.src = photo.url;

        // Always show a backup link
        modalVideoLink.hidden = false;
        modalVideoLink.innerHTML = `
            <p>If the video doesn't play, click the link below.</p>
            <a href="${photo.url}" target="_blank" rel="noopener noreferrer">
                Watch Video in a New Tab
            </a>
        `;

    } else {

        // Show the image
        modalImage.hidden = false;
        modalVideoContainer.hidden = true;

        modalImage.src = photo.hdurl || photo.url;
        modalImage.alt = photo.title;
    }

    // Information shown for BOTH images and videos
    modalTitle.textContent = photo.title;
    modalDate.textContent = `Date: ${formattedDate}`;
    modalExplanation.textContent = photo.explanation;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

    modal.classList.add("is-open");

    catch (error) {
        gallery.innerHTML = "<p>Something went wrong.</p>";
    }
