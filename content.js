let lastElement = null;

// On mémorise l'élément sous le curseur au moment du clic droit
document.addEventListener("contextmenu", (event) => {
  lastElement = event.target;
}, true);

// On écoute le signal venant du background.js
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "edit_element" && lastElement) {
    showEditPanel();
  }
});

function showEditPanel() {
  // 1. Détection intelligente du conteneur (la balise <a> ou la div parente)
  const container = lastElement.closest('a') || lastElement.closest('.card') || lastElement.parentElement;
  
  // 2. Ciblage précis de tes éléments selon les classes de ton site
  const img = container.querySelector('img');
  const title = container.querySelector('.title-wrapper');
  const content = container.querySelector('.content-wrapper'); // Le 2ème P est ici
  const btn = container.querySelector('.btn');

  // 3. Création de l'interface visuelle (UI)
  const overlay = document.createElement('div');
  overlay.id = 'quickswap-overlay';
  overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:sans-serif;backdrop-filter:blur(2px);";

  const panel = document.createElement('div');
  panel.style = "background:#fff;padding:25px;border-radius:12px;width:380px;box-shadow:0 15px-40px rgba(0,0,0,0.4);display:flex;flex-direction:column;gap:15px;border:1px solid #ddd;";
  
  panel.innerHTML = `
    <h2 style="margin:0;font-size:20px;color:#1a1a1a;display:flex;align-items:center;gap:10px;">QuickSwap Editor</h2>
    
    <div style="display:flex;flex-direction:column;gap:5px;">
        <label style="font-size:11px;font-weight:bold;color:#666;text-transform:uppercase;">URL de l'image</label>
        <input type="text" id="qs-img" value="${img ? img.src : ''}" style="padding:8px;border:1px solid #ccc;border-radius:6px;">
    </div>

    <div style="display:flex;flex-direction:column;gap:5px;">
        <label style="font-size:11px;font-weight:bold;color:#666;text-transform:uppercase;">Titre</label>
        <input type="text" id="qs-title" value="${title ? title.innerText.trim() : ''}" style="padding:8px;border:1px solid #ccc;border-radius:6px;">
    </div>

    <div style="display:flex;flex-direction:column;gap:5px;">
        <label style="font-size:11px;font-weight:bold;color:#666;text-transform:uppercase;">Description</label>
        <textarea id="qs-content" style="padding:8px;border:1px solid #ccc;border-radius:6px;height:60px;resize:none;">${content ? content.innerText.trim() : ''}</textarea>
    </div>

    <div style="display:flex;flex-direction:column;gap:5px;">
        <label style="font-size:11px;font-weight:bold;color:#666;text-transform:uppercase;">Texte du bouton</label>
        <input type="text" id="qs-btn" value="${btn ? btn.innerText.trim() : ''}" style="padding:8px;border:1px solid #ccc;border-radius:6px;">
    </div>

    <div style="display:flex;gap:10px;margin-top:5px;">
      <button id="qs-save" style="flex:2;background:#2563eb;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;font-weight:bold;transition:0.2s;">Modifier</button>
      <button id="qs-cancel" style="flex:1;background:#f3f4f6;color:#4b5563;border:none;padding:12px;border-radius:8px;cursor:pointer;font-weight:medium;">Annuler</button>
    </div>
  `;

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // 4. Logique de sauvegarde
  document.getElementById('qs-save').onclick = () => {
    if (img) { 
        img.src = document.getElementById('qs-img').value; 
        img.srcset = ""; // On force l'URL unique
    }
    if (title) title.innerText = document.getElementById('qs-title').value;
    if (content) content.innerText = document.getElementById('qs-content').value;
    if (btn) btn.innerText = document.getElementById('qs-btn').value;
    
    overlay.remove();
  };

  // Fermer si on clique sur Annuler
  document.getElementById('qs-cancel').onclick = () => overlay.remove();
}