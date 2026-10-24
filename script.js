const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// Text-to-speech speaker
function readPage() {
    if (!("speechSynthesis" in window)) {
        alert("Text-to-speech is not supported in this browser. Please try Chrome.");
        return;
    }

    window.speechSynthesis.cancel();

    const mainText = document.querySelector("main").innerText;
    const speech = new SpeechSynthesisUtterance(mainText);

    speech.lang = "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

document.getElementById("readBtn").addEventListener("click", readPage);
document.getElementById("speakBtn").addEventListener("click", readPage);

// Pause or resume speech
document.getElementById("pauseBtn").addEventListener("click", () => {
    const speaker = window.speechSynthesis;

    if (!speaker.speaking) {
        readPage();
    } else if (speaker.paused) {
        speaker.resume();
    } else {
        speaker.pause();
    }
});

// Stop speech
document.getElementById("stopBtn").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

// Demo environmental pledge form
document.getElementById("pledgeForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const pledge = document.getElementById("pledgeChoice").value;
    const message = document.getElementById("pledgeMessage");

    message.textContent =
        `${name ? "Thank you, " + name + "! " : "Thank you! "}` +
        `Your pledge is: ${pledge}.`;

    // This demo does not send or store personal information.
});