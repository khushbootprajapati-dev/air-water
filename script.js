"use strict";

/*
 * EcoAware interactions.
 * Text-to-speech uses the browser's Web Speech API and installed voices.
 * Add the real Google Forms URL to SURVEY_FORM_URL when it is available.
 */
const SURVEY_FORM_URL = "";

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("site-nav");
  const yearLabel = document.getElementById("current-year");

  if (yearLabel) {
    yearLabel.textContent = String(new Date().getFullYear());
  }

  function closeNavigation() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNavigation();
    });

    document.addEventListener("click", function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        closeNavigation();
      }
    });
  }

  /*
   * Survey link stays disabled until a valid Google Forms URL is provided.
   * This avoids linking to the wrong form or using a placeholder destination.
   */
  const surveyButton = document.getElementById("survey-form-button");
  const surveyStatus = document.getElementById("survey-form-status");

  function isGoogleFormsUrl(rawUrl) {
    try {
      const parsedUrl = new URL(rawUrl);
      const host = parsedUrl.hostname.toLowerCase();
      return parsedUrl.protocol === "https:" &&
        (host === "docs.google.com" || host === "forms.gle");
    } catch (error) {
      return false;
    }
  }

  if (surveyButton && SURVEY_FORM_URL && isGoogleFormsUrl(SURVEY_FORM_URL)) {
    const surveyLink = document.createElement("a");
    surveyLink.id = "survey-form-button";
    surveyLink.className = surveyButton.className;
    surveyLink.href = SURVEY_FORM_URL;
    surveyLink.target = "_blank";
    surveyLink.rel = "noopener noreferrer";
    surveyLink.textContent = "Open Google Form";
    surveyLink.setAttribute("aria-describedby", "survey-form-status");
    surveyButton.replaceWith(surveyLink);
    if (surveyStatus) surveyStatus.textContent = "The survey opens in a new tab.";
  } else if (surveyStatus) {
    surveyStatus.textContent = "The Google Form URL has not been provided for this project yet. The button will be enabled when the correct link is added.";
  }

  /*
   * Text-to-speech: read the main page content in short chunks for improved
   * browser compatibility. Voice availability depends on the user's device.
   */
  const playButton = document.getElementById("speaker-play");
  const pauseButton = document.getElementById("speaker-pause");
  const resumeButton = document.getElementById("speaker-resume");
  const stopButton = document.getElementById("speaker-stop");
  const voiceSelect = document.getElementById("voice-select");
  const speakerStatus = document.getElementById("speaker-status");
  const mainContent = document.getElementById("main-content");

  const speechSupported = "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  let availableVoices = [];
  let speechChunks = [];
  let speechChunkIndex = 0;
  let speechRunId = 0;
  let isReading = false;
  let isPaused = false;

  function setSpeakerStatus(message) {
    if (speakerStatus) speakerStatus.textContent = message;
  }

  function updateSpeakerButtons() {
    if (playButton) playButton.disabled = !speechSupported || isReading;
    if (pauseButton) pauseButton.disabled = !speechSupported || !isReading || isPaused;
    if (resumeButton) resumeButton.disabled = !speechSupported || !isReading || !isPaused;
    if (stopButton) stopButton.disabled = !speechSupported || (!isReading && !isPaused);
  }

  function populateVoices() {
    if (!speechSupported || !voiceSelect) return;

    const previousVoice = voiceSelect.value;
    availableVoices = window.speechSynthesis.getVoices();
    voiceSelect.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Default browser voice";
    voiceSelect.appendChild(defaultOption);

    availableVoices
      .slice()
      .sort(function (first, second) {
        return first.lang.localeCompare(second.lang) || first.name.localeCompare(second.name);
      })
      .forEach(function (voice) {
        const option = document.createElement("option");
        option.value = voice.voiceURI;
        option.textContent = voice.name + " (" + voice.lang + ")";
        voiceSelect.appendChild(option);
      });

    if (previousVoice && availableVoices.some(function (voice) { return voice.voiceURI === previousVoice; })) {
      voiceSelect.value = previousVoice;
    }
  }

  function splitTextIntoChunks(text, maxLength) {
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks = [];
    let currentChunk = "";

    sentences.forEach(function (sentence) {
      const cleanSentence = sentence.replace(/\s+/g, " ").trim();
      if (!cleanSentence) return;

      if (cleanSentence.length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = "";
        }
        const words = cleanSentence.split(/\s+/);
        let wordChunk = "";
        words.forEach(function (word) {
          if ((wordChunk + " " + word).trim().length > maxLength && wordChunk) {
            chunks.push(wordChunk);
            wordChunk = word;
          } else {
            wordChunk = (wordChunk + " " + word).trim();
          }
        });
        if (wordChunk) chunks.push(wordChunk);
        return;
      }

      if ((currentChunk + " " + cleanSentence).trim().length > maxLength && currentChunk) {
        chunks.push(currentChunk);
        currentChunk = cleanSentence;
      } else {
        currentChunk = (currentChunk + " " + cleanSentence).trim();
      }
    });

    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  }

  function getPageText() {
    if (!mainContent) return "";
    const pageCopy = mainContent.cloneNode(true);
    pageCopy.querySelectorAll(".speaker-section, button, select, script, style, nav").forEach(function (element) {
      element.remove();
    });
    return (pageCopy.innerText || pageCopy.textContent || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function speakCurrentChunk(runId) {
    if (!speechSupported || runId !== speechRunId) return;

    if (speechChunkIndex >= speechChunks.length) {
      isReading = false;
      isPaused = false;
      updateSpeakerButtons();
      setSpeakerStatus("Finished reading the page.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(speechChunks[speechChunkIndex]);
    const chosenVoice = voiceSelect && voiceSelect.value
      ? availableVoices.find(function (voice) { return voice.voiceURI === voiceSelect.value; })
      : null;

    if (chosenVoice) utterance.voice = chosenVoice;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = function () {
      if (runId !== speechRunId || !isReading) return;
      speechChunkIndex += 1;
      speakCurrentChunk(runId);
    };

    utterance.onerror = function (event) {
      if (runId !== speechRunId || event.error === "interrupted" || event.error === "canceled") return;
      isReading = false;
      isPaused = false;
      updateSpeakerButtons();
      setSpeakerStatus("Speech stopped because the selected browser voice reported an error. Try another voice or refresh the page.");
    };

    window.speechSynthesis.speak(utterance);
  }

  if (!speechSupported) {
    [playButton, pauseButton, resumeButton, stopButton, voiceSelect].forEach(function (control) {
      if (control) control.disabled = true;
    });
    setSpeakerStatus("Text-to-speech is not supported in this browser. Try an up-to-date version of Chrome, Edge, or Safari.");
  } else {
    populateVoices();
    if (typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", populateVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }
    updateSpeakerButtons();

    if (playButton) {
      playButton.addEventListener("click", function () {
        const pageText = getPageText();
        if (!pageText) {
          setSpeakerStatus("There is no page text available to read.");
          return;
        }

        speechRunId += 1;
        const currentRun = speechRunId;
        window.speechSynthesis.cancel();
        speechChunks = splitTextIntoChunks(pageText, 220);
        speechChunkIndex = 0;
        isReading = true;
        isPaused = false;
        updateSpeakerButtons();
        setSpeakerStatus("Reading page content aloud. Use Pause or Stop at any time.");
        speakCurrentChunk(currentRun);
      });
    }

    if (pauseButton) {
      pauseButton.addEventListener("click", function () {
        if (!isReading || isPaused) return;
        window.speechSynthesis.pause();
        isPaused = true;
        updateSpeakerButtons();
        setSpeakerStatus("Reading paused. Press Resume to continue.");
      });
    }

    if (resumeButton) {
      resumeButton.addEventListener("click", function () {
        if (!isReading || !isPaused) return;
        window.speechSynthesis.resume();
        isPaused = false;
        updateSpeakerButtons();
        setSpeakerStatus("Resuming page narration.");
      });
    }

    if (stopButton) {
      stopButton.addEventListener("click", function () {
        speechRunId += 1;
        window.speechSynthesis.cancel();
        speechChunks = [];
        speechChunkIndex = 0;
        isReading = false;
        isPaused = false;
        updateSpeakerButtons();
        setSpeakerStatus("Reading stopped.");
      });
    }
  }
});
