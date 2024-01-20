const button = document.createElement("button");
button.textContent = "Save Highlight";
button.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "saveHighlight" });
});
document.body.appendChild(button);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPopup") {
    chrome.runtime.openOptionsPage();
  } else if (request.action === "getHighlight") {
    sendResponse({ text: window.getSelection().toString() });
  }
});
