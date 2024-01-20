const highlightsList = document.getElementById("highlights-list");
const chatOutput = document.getElementById("chat-output");

document.getElementById("send-to-backend").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "sendToBackend" });
});

document.getElementById("chat-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const question = event.target.value;
    event.target.value = "";

    chrome.runtime.sendMessage({ action: "sendQuestion", text: question });
  }
});

document.getElementById("open-chat").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openChatPage" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayVectaraOutput") {
    chatOutput.innerHTML += `<p>Vectara: ${request.output}</p>`;
  }
});

chrome.storage.local.get("highlights", (data) => {
  data.highlights.forEach((highlight) => {
    const listItem = document.createElement("li");
    listItem.textContent = highlight;
    highlightsList.appendChild(listItem);
  });
});
