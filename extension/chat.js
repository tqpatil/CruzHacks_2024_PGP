document.getElementById("send-question").addEventListener("click", () => {
    const question = document.getElementById("chat-input").value;
    document.getElementById("chat-input").value = "";
  
    chrome.runtime.sendMessage({ action: "sendQuestion", text: question });
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "displayVectaraOutput") {
      const chatOutput = document.getElementById("chat-output");
      chatOutput.innerHTML += `<p>Vectara: ${request.output}<div><p>${request.source}</p></div></p>`;
      //chatOutput.innerHTML += `<p>Source: ${request.source}</p>`;
    }
  });
  