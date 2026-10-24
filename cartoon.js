// Replay controls for the water and air cartoon animations.
document.querySelectorAll("[data-replay]").forEach(button => {
  button.addEventListener("click", () => {
    const stage = button.closest(".cartoon-card")?.querySelector(".cartoon-stage");
    if (!stage) return;
    stage.classList.remove("replay");
    void stage.offsetWidth;
    stage.classList.add("replay");
    window.setTimeout(() => stage.classList.remove("replay"), 8200);
  });
});
