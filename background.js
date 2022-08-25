//we want an event listener to execute functionality after either a button press or extension loads

// create word scrambler function
// select all elements of the body, do not include scripts, styles, and noscripts
//'body *:not(script, noscript, style, header)'
// 'p, h1, h2, h3, h4, h5, h6, a, td, li'
function wordScrambler() {
  document
    .querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, td, li')
    .forEach((node) => {
      const text = node.innerText;
      if (text) {
        const words = text.split(' ');
        words.forEach((word, index) => {
          if (/^[\.a-zA-Z0-9,!?:'; ]*$/.test(word)) {
            const letters = word.split('');
            for (let i = 1; i < letters.length - 1; i += 2) {
              if (i + 1 !== letters.length - 1) {
                const current = letters[i];
                const next = letters[i + 1];
                letters[i] = next;
                letters[i + 1] = current;
              }
            }
            words[index] = letters.join('');
          }
        });
        node.innerText = words.join(' ');
      }
    });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: wordScrambler,
    });
  }
});
