//we want an event listener to execute functionality after either a button press or extension loads

//create a function that converts the font of the page to comic sans

function toComicSans() {
  document.body.style.fontFamily = 'Arial';
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toComicSans,
    });
  }
});
