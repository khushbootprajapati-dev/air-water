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

  /* Short, private-by-default quiz for active learning. Scores stay in this page. */
  const quizForm = document.getElementById("quiz-form");
  if (quizForm) {
    const quizProgress = document.getElementById("quiz-progress");
    const quizQuestionLabel = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const quizCheckButton = document.getElementById("quiz-check");
    const quizNextButton = document.getElementById("quiz-next");
    const quizRestartButton = document.getElementById("quiz-restart");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizScoreLabel = document.getElementById("quiz-score");

    const quizQuestions = [
      {
        question: "Which choice can help reduce pollution from short vehicle trips?",
        options: [
          "Leave a vehicle engine running while waiting",
          "Walk or cycle when the route is safe and practical",
          "Burn household waste outdoors",
          "Use a vehicle for every short trip"
        ],
        answer: 1,
        explanation: "Walking or cycling for suitable trips avoids exhaust emissions from that journey. Public transport and carpooling can also help."
      },
      {
        question: "Why should plastic waste be kept out of drains, rivers, and lakes?",
        options: [
          "It makes water safer to drink",
          "It disappears immediately in water",
          "It can pollute water and harm wildlife",
          "It improves the flow of clean water"
        ],
        answer: 2,
        explanation: "Plastic litter can persist in the environment, block drains, and injure or be swallowed by animals."
      },
      {
        question: "What is a safer approach to household chemicals or used batteries?",
        options: [
          "Pour them into a river",
          "Burn them with mixed waste",
          "Put them into any water drain",
          "Follow product guidance and local collection or disposal rules"
        ],
        answer: 3,
        explanation: "Some chemicals and batteries can pollute soil and water. Follow the product label and your local authority's disposal guidance."
      },
      {
        question: "Which everyday action helps conserve water?",
        options: [
          "Repair leaking taps when possible",
          "Keep taps running while brushing",
          "Wash pavements with a hose unnecessarily",
          "Ignore leaks because they are small"
        ],
        answer: 0,
        explanation: "Repairing leaks and turning taps off when water is not needed reduces avoidable water waste."
      },
      {
        question: "How should you interpret the 50% / 50% survey summary on this project page?",
        options: [
          "It is a live reading from an air-quality sensor",
          "It is automatically updated from Google Forms",
          "It is a manually entered project summary that should be checked against actual responses",
          "It measures today's drinking-water safety"
        ],
        answer: 2,
        explanation: "The displayed figures are static project content, not live measurements or a live Google Forms connection. Compare them with collected responses before presenting them as final."
      }
    ];

    let quizIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;

    function updateQuizScore() {
      if (quizScoreLabel) {
        quizScoreLabel.textContent = "Score: " + quizScore + " / " + quizQuestions.length;
      }
    }

    function renderQuizQuestion() {
      const item = quizQuestions[quizIndex];
      if (!item || !quizQuestionLabel || !quizOptions) return;

      quizProgress.textContent = "Question " + (quizIndex + 1) + " of " + quizQuestions.length;
      quizQuestionLabel.textContent = item.question;
      quizOptions.replaceChildren();

      item.options.forEach(function (optionText, optionIndex) {
        const label = document.createElement("label");
        label.className = "quiz-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-answer";
        input.value = String(optionIndex);
        input.required = true;

        const optionLabel = document.createElement("span");
        optionLabel.textContent = optionText;

        label.appendChild(input);
        label.appendChild(optionLabel);
        quizOptions.appendChild(label);
      });

      quizAnswered = false;
      quizCheckButton.disabled = false;
      quizNextButton.disabled = true;
      quizNextButton.textContent = quizIndex === quizQuestions.length - 1 ? "See results" : "Next question";
      quizFeedback.textContent = "Choose one answer, then select Check answer.";
      quizFeedback.classList.remove("is-correct", "is-incorrect");
      updateQuizScore();
    }

    quizOptions.addEventListener("change", function (event) {
      const changedInput = event.target;
      if (!changedInput || changedInput.name !== "quiz-answer" || quizAnswered) return;
      quizOptions.querySelectorAll(".quiz-option").forEach(function (label) {
        label.classList.remove("is-selected");
      });
      changedInput.closest(".quiz-option").classList.add("is-selected");
    });

    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (quizAnswered) return;

      const selected = quizForm.querySelector('input[name="quiz-answer"]:checked');
      if (!selected) {
        quizFeedback.textContent = "Please choose one answer before continuing.";
        quizFeedback.classList.remove("is-correct", "is-incorrect");
        const firstOption = quizOptions.querySelector('input[name="quiz-answer"]');
        if (firstOption) firstOption.focus();
        return;
      }

      const item = quizQuestions[quizIndex];
      const selectedIndex = Number(selected.value);
      const isCorrect = selectedIndex === item.answer;
      quizAnswered = true;

      if (isCorrect) quizScore += 1;

      quizOptions.querySelectorAll("input[name='quiz-answer']").forEach(function (input) {
        input.disabled = true;
        const label = input.closest(".quiz-option");
        if (label) {
          label.classList.remove("is-selected");
          if (Number(input.value) === item.answer) label.classList.add("is-answer-correct");
          if (Number(input.value) === selectedIndex && !isCorrect) label.classList.add("is-answer-incorrect");
        }
      });

      quizFeedback.textContent = (isCorrect ? "Correct! " : "Not quite. The correct answer is: " + item.options[item.answer] + ". ") + item.explanation;
      quizFeedback.classList.toggle("is-correct", isCorrect);
      quizFeedback.classList.toggle("is-incorrect", !isCorrect);
      quizCheckButton.disabled = true;
      quizNextButton.disabled = false;
      quizNextButton.focus();
      updateQuizScore();
    });

    quizNextButton.addEventListener("click", function () {
      if (!quizAnswered) return;

      if (quizIndex < quizQuestions.length - 1) {
        quizIndex += 1;
        renderQuizQuestion();
        quizQuestionLabel.focus();
        return;
      }

      quizProgress.textContent = "Quiz completed";
      quizQuestionLabel.textContent = "Your result";
      quizOptions.replaceChildren();
      quizCheckButton.disabled = true;
      quizNextButton.disabled = true;
      quizFeedback.classList.remove("is-correct", "is-incorrect");
      quizFeedback.textContent = "You scored " + quizScore + " out of " + quizQuestions.length + " (" + Math.round((quizScore / quizQuestions.length) * 100) + "%). " +
        (quizScore === quizQuestions.length ? "Excellent work!" : "Review the explanations and try again to learn more.");
      quizQuestionLabel.focus();
    });

    quizRestartButton.addEventListener("click", function () {
      quizIndex = 0;
      quizScore = 0;
      renderQuizQuestion();
      quizQuestionLabel.focus();
    });

    renderQuizQuestion();
  }

});
