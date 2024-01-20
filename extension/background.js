// background.js
chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "openPopup");
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveHighlight") {
    const highlightedText = request.text;
    fetch("/your-save-highlight-endpoint", {
      method: "POST",
      body: JSON.stringify({ text: highlightedText })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Backend response:", data);
    });
  } else if (request.action === "sendQuestion") {
    fetch("/your-send-question-endpoint", {
      method: "POST",
      body: JSON.stringify({ question: request.text })
    })
    .then(response => response.json())
    .then(data => {
      chrome.runtime.sendMessage({ action: "displayVectaraOutput", output: data.output });
    });
  } else if (request.action === "openChatPage") {
    chrome.tabs.create({ url: "chat.html" });
  } else if (request.action === "retrieveBackendData") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "retrieveBackendData" });
    });
  }

});
