chrome.runtime.onMessage.addListener((message, _) => {
  const { action, tabId, latitude, longitude, accuracy } = message;

  if (action === "spoof") {
    chrome.debugger.attach({ tabId }, "1.3", () => {
      chrome.debugger.sendCommand(
        { tabId },
        "Emulation.setGeolocationOverride",
        { latitude, longitude, accuracy }
      );
    });
  }

  if (action === "reset") {
    chrome.debugger.sendCommand(
      { tabId },
      "Emulation.clearGeolocationOverride",
      {},
      () => chrome.debugger.detach({ tabId })
    );
  }
});
