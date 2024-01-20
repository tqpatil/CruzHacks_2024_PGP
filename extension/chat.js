document.getElementById("send-question").addEventListener("click", () => {
    const question = document.getElementById("chat-input").value;
    document.getElementById("chat-input").value = "";
  
    chrome.runtime.sendMessage({ action: "sendQuestion", text: question });
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "displayVectaraOutput") {
      const chatOutput = document.getElementById("chat-output");
      chatOutput.innerHTML += `<p>Vectara: ${request.output}</p>`;
    } else if (request.action === "retrieveBackendData") {
      // Make a request to your backend to retrieve data
      fetch("/your-backend-endpoint")
        .then(response => response.json())
        .then(data => {
          // Display the retrieved data in the chat output
          const chatOutput = document.getElementById("chat-output");
          chatOutput.innerHTML += `<p>Backend Response: ${data.message}</p>`;
        })
        .catch(error => console.error("Error retrieving data from backend:", error));
    }
  });
  