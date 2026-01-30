let lastElement = null;

document.addEventListener("contextmenu", (event) => {
  lastElement = event.target;
}, true);

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "replace_clicked_image" && lastElement) {
    const newUrl = prompt("Collez l'URL de remplacement :");
    if (!newUrl) return;

    // Cas 1 : C'est une balise image classique
    if (lastElement.tagName === "IMG") {
      lastElement.src = newUrl;
      lastElement.srcset = "";
    } 
    // Cas 2 : On cherche dans les enfants (si on a cliqué sur le conteneur du lien)
    else if (lastElement.querySelector('img')) {
      const img = lastElement.querySelector('img');
      img.src = newUrl;
      img.srcset = "";
    }
    // Cas 3 : C'est un fond CSS (background-image)
    else {
      lastElement.style.backgroundImage = `url('${newUrl}')`;
      lastElement.style.backgroundSize = "cover";
    }
  }
});