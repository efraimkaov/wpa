if ('serviceWorker' in navigator) {
navigator.serviceWorker
  .register("/wpa/service-worker.js", { scope: "/wpa/" })
  .then(() => console.log("Service Worker registered"))
  .catch((error) => console.log("Service Worker registration failed:", error));
}
