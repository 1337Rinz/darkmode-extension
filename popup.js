const toggle = document.getElementById("darkToggle");
const label = document.getElementById("modeLabel");

let domain = "";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = new URL(tabs[0].url);
  domain = url.hostname;

  chrome.storage.sync.get([domain], (res) => {
    toggle.checked = res[domain] || false;
    label.innerText = toggle.checked ? "Dark mode" : "Light mode";
  });
});

toggle.addEventListener("change", () => {
  const isDark = toggle.checked;
  label.innerText = isDark ? "Dark mode" : "Light mode";

  const setting = {};
  setting[domain] = isDark;
  chrome.storage.sync.set(setting);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: setDarkMode,
      args: [isDark]
    });
  });
});

function setDarkMode(enable) {
  const existing = document.getElementById("dark-mode-style");
  if (existing) existing.remove();
  if (!enable) return;

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
label.style.color = isDark ? "#ffffff" : "#222222";
