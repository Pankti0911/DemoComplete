window.addEventListener("offline", () => {
  alert("⚠️ You are offline. Data will be saved locally.");
});

window.addEventListener("online", () => {
  alert("✅ You are back online. Pending data can be synced.");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", function (e) {

    // 🚫 FULLY BLOCK DEFAULT BEHAVIOR
    if (!navigator.onLine) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
      queue.push(data);
      localStorage.setItem("offlineQueue", JSON.stringify(queue));

      alert("📦 Saved locally. UI will NOT disappear.");

      // ❗ IMPORTANT: stop browser navigation completely
      return false;
    }
  }, true); // 🔥 CAPTURE PHASE
});
