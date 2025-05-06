const domain = location.hostname;
chrome.storage.sync.get([domain], (res) => {
  if (res[domain]) {
    const style = document.createElement("style");
    style.id = "dark-mode-style";
    style.innerHTML = `
      html, body {
        background-color: #212121 !important;
        color: #e0e0e0 !important;
      }
      * {
        background-color: transparent !important;
        color: #e0e0e0 !important;
        border-color: #424242 !important;
      }
      a, a * {
        color: #90caf9 !important;
      }
      img, video {
        filter: brightness(0.85) contrast(1.1);
      }
      input, textarea, select, button {
        background-color: #2a2a2a !important;
        color: #e0e0e0 !important;
        border: 1px solid #424242 !important;
      }
    `;
    document.head.appendChild(style);
  }
});
