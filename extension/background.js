chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "openPopup");
    });
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveHighlight") {
      chrome.tabs.sendMessage(sender.tab.id, "getHighlight");
    } else if (request.action === "sendHighlight") {
      const selection = request.text;
      chrome.storage.local.set({ highlights: [selection] }, () => {
        console.log("Highlight saved!");
      });
    }
});
  