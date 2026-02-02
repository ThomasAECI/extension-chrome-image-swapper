chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quickSwapAction",
    title: "Modifier ce bloc",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "quickSwapAction") {
    chrome.tabs.sendMessage(tab.id, { action: "edit_element" });
  }
});