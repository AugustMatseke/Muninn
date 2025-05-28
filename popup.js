document.addEventListener("DOMContentLoaded", () => {
  const btnSpoof = document.getElementById("spoof");
  const btnReset = document.getElementById("reset");

  async function getActiveTabId() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.id;
  }

  btnSpoof.addEventListener("click", async () => {
    const tabId = await getActiveTabId();
    const latitude  = parseFloat(document.getElementById("lat").value);
    const longitude = parseFloat(document.getElementById("lon").value);
    const accuracy  = parseFloat(document.getElementById("acc").value);

    chrome.runtime.sendMessage({
      action:  "spoof",
      tabId,  
      latitude,
      longitude,
      accuracy
    });
  });

  btnReset.addEventListener("click", async () => {
    const tabId = await getActiveTabId();
    chrome.runtime.sendMessage({ action: "reset", tabId });
  });
});
