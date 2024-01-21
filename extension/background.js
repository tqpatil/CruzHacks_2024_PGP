// background.js
chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "openPopup");
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveHighlight") {
    const highlightedText = request.text;
    if (highlightedText == " " || highlightedText == ""){
      console.log("error");
    }
    console.log(highlightedText);
    fetch("https://smart-highlighter-ffd082798250.herokuapp.com/store", {
      method: "POST",
      body: JSON.stringify({ "text": highlightedText, "secret": "Tanishqisthegoat" })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Backend response:", data);
    });
    setTimeout(() => {fetch("https://smart-highlighter-ffd082798250.herokuapp.com/resetCorp", {
      method: "Put",
      body: JSON.stringify({ "secret": "Tanishqisthegoat", "corpus_id": 4})
    }).then(data => {
      console.log("Backend response:", data);
    })
    }, 10000);

  } else if (request.action === "sendQuestion") {
    fetch("https://smart-highlighter-ffd082798250.herokuapp.com/replace", {
      method: "Put",
      body: JSON.stringify({ "secret": "Tanishqisthegoat", "corpus_id": 4})
    }).then(data => {
      console.log("Backend response:", data);
    });
    console.log(request.text);
    fetch("https://smart-highlighter-ffd082798250.herokuapp.com/readReq", {
      method: "POST",
      body: JSON.stringify({ "text" : request.text, "secret": "Tanishqisthegoat", "corpus_id": 4 })
    }).then(response => response.json())
    .then(parsedData => {
      chrome.runtime.sendMessage({ action: "displayVectaraOutput", output: parsedData.output });
    })
    .catch(error => {
      console.error("Error:", error);
    });


  } else if (request.action === "openChatPage") {
    chrome.tabs.create({ url: "chat.html" });
  } else if (request.action === "retrieveBackendData") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "retrieveBackendData" });
    });
  }

});


