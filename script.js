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

// Shared Learn More dialog for the Understand, Visualize, and Take Action cards.
const learnMoreGuides = {
    "air-pollution": {
        title: "Air Pollution",
        detail: "Air pollution happens when harmful gases, smoke, dust, or tiny particles enter the air. Traffic, industrial activity, and burning mixed waste are common sources. Notice local sources and follow trustworthy public-health advice during poor-air conditions.",
        target: "#air",
        linkText: "Explore air quality"
    },
    "water-pollution": {
        title: "Water Pollution",
        detail: "Water pollution occurs when waste, sewage, oil, or harmful chemicals enter rivers, lakes, groundwater, or other water sources. Preventing pollution at the source and disposing of waste safely helps protect people and aquatic life.",
        target: "#water",
        linkText: "Explore water quality"
    },
    "health-impacts": {
        title: "Health Impacts",
        detail: "Air pollution can worsen breathing problems and affect overall wellbeing. Contaminated water can carry germs or harmful substances. For health concerns or water-safety decisions, follow guidance from qualified health professionals and trusted local authorities.",
        target: "#air",
        linkText: "Read the pollution overview"
    },
    "causes-pollution": {
        title: "Causes of Pollution",
        detail: "Common sources include vehicle emissions, industrial processes, dust, waste burning, plastic litter, untreated sewage, and unsafe chemical disposal. Identifying a source helps communities choose prevention steps that address the actual problem.",
        target: "#air",
        linkText: "Explore common sources"
    },
    "environmental-impact": {
        title: "Environmental Impact",
        detail: "Pollution can damage natural habitats, affect wildlife, contaminate soil and water, and place pressure on ecosystems. The scale of an impact depends on the pollutant, amount, location, exposure, and local conditions.",
        target: "#water",
        linkText: "Explore water and habitats"
    },
    "pollution-prevention": {
        title: "Pollution Prevention",
        detail: "Prevention starts with reducing waste, avoiding open burning, using cleaner travel options when practical, maintaining equipment, and keeping chemicals and litter out of drains and water bodies. Follow local disposal and recycling rules.",
        target: "#solutions",
        linkText: "See practical actions"
    },
    "clean-air-awareness": {
        title: "Clean Air Awareness",
        detail: "Look for local sources such as traffic, smoke, construction dust, or waste burning. Share reliable information, reduce avoidable emissions, and consult official air-quality information when current local conditions matter.",
        target: "#air",
        linkText: "Explore air quality"
    },
    "safe-water-awareness": {
        title: "Safe Water Awareness",
        detail: "Clear-looking water is not always safe to drink. Water safety depends on contaminants that may not be visible. Follow trusted local water-authority or public-health guidance and use appropriate testing when needed.",
        target: "#water",
        linkText: "Explore water quality"
    },
    "air-quality-charts": {
        title: "Air Quality Charts",
        detail: "When reading an air-quality chart, check its title, location, date, pollutant, units, and source. The air-source bars on this website are illustrative examples only; they are not AQI values or real measurements.",
        target: "#air",
        linkText: "View the illustrative air chart"
    },
    "water-quality-charts": {
        title: "Water Quality Charts",
        detail: "Water-quality charts may show parameters such as pH, turbidity, dissolved substances, or microbiological test results. Each parameter has a different meaning, and no single value can prove that water is safe. This website does not provide live water-test readings.",
        target: "#water",
        linkText: "Explore water quality"
    },
    "aqi-levels": {
        title: "AQI Levels",
        detail: "The Air Quality Index (AQI) summarizes air pollution using a defined scale. The scale, categories, and health advice may differ by country. Always check the date, location, and official source for current readings; this website does not display live AQI.",
        target: "#air",
        linkText: "Explore air pollution"
    },
    "pollution-comparison": {
        title: "Pollution Comparison",
        detail: "Comparisons are most useful when the data uses the same units, time period, location scope, and method. A larger bar does not automatically mean a greater health risk unless the metric and its context are understood.",
        target: "#air",
        linkText: "Review the example chart"
    },
    "interactive-graphs": {
        title: "Interactive Graphs",
        detail: "Interactive graphs can let visitors choose categories, inspect values, or compare periods. These controls should only be used with a clearly described dataset. The current chart on this website is a static illustration, not a live graph or sensor feed.",
        target: "#air",
        linkText: "Review the example chart"
    },
    "environmental-statistics": {
        title: "Environmental Statistics",
        detail: "Before sharing a statistic, check who collected it, when and where it was collected, which units were used, how many observations were included, and how the result was calculated. The survey summary on this project is manually entered and should be checked against actual responses.",
        target: "#about",
        linkText: "Return to project overview"
    },
    "air-vs-water": {
        title: "Air vs. Water Pollution",
        detail: "Air pollution may spread through gases and particles in the atmosphere, while water pollution can travel through rivers, lakes, groundwater, and drainage systems. Compare the sources, routes of exposure, affected ecosystems, and prevention methods without mixing unrelated measurements.",
        target: "#water",
        linkText: "Explore water pollution"
    },
    "data-interpretation": {
        title: "Data Interpretation",
        detail: "Start with the title, axes, units, source, and date. Look for patterns, unusual values, and missing context. A relationship between two variables does not by itself prove that one caused the other, and a chart may not represent every community.",
        target: "#air",
        linkText: "Explore the example chart"
    },
    "plant-trees": {
        title: "Plant More Trees",
        detail: "Choose tree species that suit local conditions, plant them in appropriate places, and care for them as they grow. Protecting existing mature trees is also valuable. Trees are one part of environmental care, not a substitute for reducing pollution at its source.",
        target: "#solutions",
        linkText: "Return to action cards"
    },
    "save-water": {
        title: "Save Water",
        detail: "Turn off taps when they are not needed, fix leaks where possible, use water thoughtfully while cleaning, and follow local advice during shortages. Small repeated habits can reduce avoidable water waste.",
        target: "#water",
        linkText: "Explore water quality"
    },
    "reduce-plastic": {
        title: "Reduce Plastic",
        detail: "Carry reusable items when practical, avoid unnecessary single-use packaging, reuse suitable containers, and separate waste according to local collection rules. Keep plastic litter away from drains and water bodies.",
        target: "#water",
        linkText: "Explore water pollution"
    },
    "public-transport": {
        title: "Use Public Transport",
        detail: "Buses, trains, shared rides, walking, and cycling can reduce emissions per person when practical, accessible, and safe. Choose options that suit the route and local conditions.",
        target: "#air",
        linkText: "Explore air pollution"
    },
    "clean-water-sources": {
        title: "Keep Water Sources Clean",
        detail: "Never dump oils, chemicals, medicines, or litter into drains, streams, ponds, or rivers. Use the correct local collection and disposal routes and report pollution to the appropriate local authority.",
        target: "#water",
        linkText: "Explore water pollution"
    },
    "spread-awareness": {
        title: "Spread Awareness",
        detail: "Share information from trustworthy sources, explain simple prevention steps, and invite others to join environmental activities. Avoid forwarding unverified pollution statistics or presenting illustrative values as real measurements.",
        target: "#about",
        linkText: "Return to project overview"
    },
    "cleanup-drives": {
        title: "Join Clean-Up Drives",
        detail: "Join an organized community clean-up, follow the organizer's safety instructions, wear suitable protection, and do not handle unknown chemicals, sharp objects, or hazardous waste. Ask the local authority how collected waste should be managed.",
        target: "#solutions",
        linkText: "Return to action cards"
    },
    "eco-pledge": {
        title: "Take an Eco-Pledge",
        detail: "Choose one realistic action to try this week, such as saving water, using a reusable bottle, or sharing trusted environmental information. The form below is a local demonstration and does not send or store responses.",
        target: "#pledge",
        linkText: "Make your eco-pledge"
    }
};

const learnMoreDialog = document.getElementById("learnMoreDialog");
const learnMoreTitle = document.getElementById("learnMoreTitle");
const learnMoreDescription = document.getElementById("learnMoreDescription");
const learnMoreRelatedLink = document.getElementById("learnMoreRelatedLink");
const closeLearnMore = document.getElementById("closeLearnMore");

if (learnMoreDialog && learnMoreTitle && learnMoreDescription && learnMoreRelatedLink) {
    document.querySelectorAll(".learn-more-btn").forEach(button => {
        button.addEventListener("click", () => {
            const guide = learnMoreGuides[button.dataset.topic];
            if (!guide) return;

            learnMoreTitle.textContent = guide.title;
            learnMoreDescription.textContent = guide.detail;
            learnMoreRelatedLink.href = guide.target;
            learnMoreRelatedLink.innerHTML = "";

            const label = document.createTextNode(guide.linkText + " ");
            const arrow = document.createElement("span");
            arrow.setAttribute("aria-hidden", "true");
            arrow.textContent = "→";
            learnMoreRelatedLink.append(label, arrow);

            if (typeof learnMoreDialog.showModal === "function") {
                learnMoreDialog.showModal();
            } else {
                window.alert(guide.title + "\n\n" + guide.detail);
            }
        });
    });

    if (closeLearnMore) {
        closeLearnMore.addEventListener("click", () => {
            if (typeof learnMoreDialog.close === "function") {
                learnMoreDialog.close();
            }
        });
    }

    learnMoreDialog.addEventListener("click", event => {
        if (event.target === learnMoreDialog && typeof learnMoreDialog.close === "function") {
            learnMoreDialog.close();
        }
    });

    learnMoreRelatedLink.addEventListener("click", () => {
        if (typeof learnMoreDialog.close === "function") {
            learnMoreDialog.close();
        }
    });
}
