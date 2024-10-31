function downloadAndClose() {
  const downloadButton = document.querySelector('#slowDownloadButton'); 
  if (downloadButton) { // Finds the download button.
    downloadButton.click(); // Clicks that shiet
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: "closeTab" }); // Sends message to close chrome tab after ten seconds.
    }, 10000);
  }
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { // Listen for tab updates
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.match(/^https:\/\/www\.nexusmods\.com\/morrowind\/mods\/\d+\?tab=files/)) {   // Check if the URL matches the Nexus Mods download page pattern
      chrome.scripting.executeScript({   // Executes the downloadAndClose function
        target: { tabId: tabId },
        func: downloadAndClose  
      });
    }
  }
});

// Listen for close tab message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "closeTab" && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});