const highlightsList = document.getElementById("highlights-list");
const chatContainer = document.querySelector(".chat-container");
const chatOutput = document.getElementById("chat-output");
document.getElementById("send-to-backend").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => getSelection().toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  chrome.runtime.sendMessage({ action: "saveHighlight", text: result });
};
/*
document.getElementById("send-to-backend").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getHighlight" }, (response) => {
      const highlightedText = response.text;
      chrome.runtime.sendMessage({ action: "saveHighlight", text: highlightedText });
    });
  });
});*/


document.getElementById("chat-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const question = event.target.value;
    event.target.value = "";

    chrome.runtime.sendMessage({ action: "sendQuestion", text: question });
  }
});

document.getElementById("open-chat").addEventListener("click", () => {
  chatContainer.style.display = "block";
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayVectaraOutput") {
    chatOutput.innerHTML += `<p>Vectara: ${request.output}</p>`;
  }
});


