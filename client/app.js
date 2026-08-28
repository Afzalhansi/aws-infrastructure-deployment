// ------------------------------------------------------------------
// Client-side script for Abdul Basit Hansi's first AWS deployment
// Fetches dynamic content from the Express API defined in server.js
// ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  loadLearningList();
  loadTrendingServices();
  setYear();
});

async function loadLearningList() {
  const el = document.getElementById("learning-list");
  if (!el) return;

  try {
    const res = await fetch("/api/learning");
    const data = await res.json();

    el.innerHTML = data.currentlyLearning
      .map(
        (item) => `
        <li>
          <span class="check">✔</span>
          <span>${item}</span>
        </li>`
      )
      .join("");
  } catch (err) {
    el.innerHTML = `<li>Could not load learning list — is the server running?</li>`;
    console.error("Failed to load /api/learning:", err);
  }
}

async function loadTrendingServices() {
  const el = document.getElementById("trending-grid");
  if (!el) return;

  try {
    const res = await fetch("/api/trending");
    const data = await res.json();

    el.innerHTML = data.popularAwsServices
      .map(
        (svc) => `
        <div class="card">
          <div class="icon">${svc.name.slice(0, 2).toUpperCase()}</div>
          <h4>${svc.name}</h4>
          <p>${svc.use}</p>
        </div>`
      )
      .join("");
  } catch (err) {
    el.innerHTML = `<p>Could not load trending services — is the server running?</p>`;
    console.error("Failed to load /api/trending:", err);
  }
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
