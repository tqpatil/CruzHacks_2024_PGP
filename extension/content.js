const button = document.createElement("button");
button.textContent = "Save Highlight";
button.addEventListener("click", () => {
  const highlightedText = window.getSelection().toString();
  chrome.runtime.sendMessage({ action: "saveHighlight", text: highlightedText });
});
document.body.appendChild(button);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPopup") {
    chrome.runtime.openOptionsPage();
  } else if (request.action === "getHighlight") {
    sendResponse({ text: window.getSelection().toString() });
  } else if (request.action === "retrieveBackendData") {
    // Implement the logic to retrieve data from your backend
    // Send a message to the background script with the retrieved data
    chrome.runtime.sendMessage({ action: "retrieveBackendData" });
  }
});
