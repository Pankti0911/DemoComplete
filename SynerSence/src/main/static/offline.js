// offline.js

window.addEventListener("offline", () => {
    alert("⚠️ You are offline. Data will be saved locally.");
});

window.addEventListener("online", () => {
    alert("✅ You are back online. Pending data will be synced.");
});

// Example: Save patient form offline
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        if (!navigator.onLine) {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form));
            const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
            queue.push(data);
            localStorage.setItem("offlineQueue", JSON.stringify(queue));

            alert("📦 Data saved locally. It will sync when online.");
        }
    });
});
