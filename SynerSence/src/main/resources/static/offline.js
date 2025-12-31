window.addEventListener("offline", () => {
  alert("⚠️ You are offline. Data will be saved locally.");
});

window.addEventListener("online", () => {
  alert("✅ Back online. Syncing data...");
  syncOfflineData();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", e => {
    if (!navigator.onLine) {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form));
      const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
      queue.push(data);

      localStorage.setItem("offlineQueue", JSON.stringify(queue));
      alert("📦 Saved offline");
    }
  });
});

function syncOfflineData() {
  const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
  if (queue.length === 0) return;

  queue.forEach(data => {
    fetch("/patients/save", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    });
  });

  localStorage.removeItem("offlineQueue");
}
