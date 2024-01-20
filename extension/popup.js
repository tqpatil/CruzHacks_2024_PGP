const highlightsList = document.getElementById("highlights-list");

chrome.storage.local.get("highlights", (data) => {
  data.highlights.forEach((highlight) => {
    const listItem = document.createElement("li");
    listItem.textContent = highlight;
    highlightsList.appendChild(listItem);
  });
});
