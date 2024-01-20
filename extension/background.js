chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "openPopup");
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveHighlight") {
      chrome.storage.local.get("highlights", (data) => {
        const highlights = data.highlights || [];
        highlights.push(request.text);
        chrome.storage.local.set({ highlights }, () => {
          console.log("Highlights saved:", highlights);
        });
      });
    } else if (request.action === "sendToBackend") {
      chrome.storage.local.get("highlights", (data) => {
        fetch("/your-backend-endpoint", {
          method: "POST",
          body: JSON.stringify({ highlights: data.highlights })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Backend response:", data);
        });
      });
    } else if (request.action === "sendQuestion") {
      fetch("/your-backend-endpoint", {
        method: "POST",
        body: JSON.stringify({ question: request.text })
      })
      .then(response => response.json())
      .then(data => {
        chrome.runtime.sendMessage({ action: "displayVectaraOutput", output: data.output });
      });
    }
  });
  