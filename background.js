// Minimal for now. Required for manifest v3
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ accuracy: "exact" });
});