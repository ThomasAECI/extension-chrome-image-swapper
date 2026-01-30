chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "swapImageAction",
    title: "🖼️ Remplacer l'image par une URL",
    // "all" permet d'afficher l'option même si l'image est dans un lien
    contexts: ["image", "link", "action"] 
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Optionnel : on peut ajouter des logs ici pour débugger
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "swapImageAction") {
    chrome.tabs.sendMessage(tab.id, {
      action: "replace_clicked_image"
    });
  }
});