const highlightsList = document.getElementById("highlights-list");
const chatContainer = document.querySelector(".chat-container");
const chatOutput = document.getElementById("chat-output");

document.getElementById("send-to-backend").addEventListener("click", () => {
  const highlightedText = window.getSelection().toString();
  chrome.runtime.sendMessage({ action: "saveHighlight" });
  console.log("Hello");
});

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


