'use strict';

window.onload = function() {
    mainMenu();
};

function mainMenu() {
    const app = document.getElementById('app');
    app.innerHTML = "";
    
    // Ripristina lo sfondo salvato o usa quello di default
    const savedBg = localStorage.getItem('user-bg-color') || "#f8fafc";
    document.body.style.backgroundColor = savedBg;

    const title = document.createElement('h1');
    title.textContent = "Counter Master";
    app.append(title);

    const menuContainer = document.createElement('div');
    menuContainer.id = "menu-container";

    const modes = [
        { name: "Classic Mode", type: "classic" },
        { name: "Fun Mode", type: "fun" },
        { name: "Coming Soon", type: "dev" }
    ];

    modes.forEach(mode => {
        const btn = document.createElement('button');
        btn.textContent = mode.name;
        btn.onclick = () => mode.type === "dev" ? showWorkInProgress() : initCounter(mode.type); 
        menuContainer.append(btn);
    });

    app.append(menuContainer);
}

function initCounter(type) {
    const app = document.getElementById('app');
    app.innerHTML = "";

    let counter = 0;

    const btnBack = document.createElement('button');
    btnBack.className = "btn-back";
    btnBack.textContent = "← Back to Menu";
    btnBack.onclick = mainMenu;
    app.append(btnBack);

    // Settings Box
    const settingsBox = document.createElement('div');
    settingsBox.id = "settings-box";

    // Salvataggio Colore Sfondo
    const bgPicker = createColorPicker("Sfondo", 'user-bg-color', (color) => {
        document.body.style.backgroundColor = color; 
    });

    // Salvataggio Colore Box
    const boxPicker = createColorPicker("Box", 'user-box-color', (color) => {
        document.getElementById('counter-container').style.backgroundColor = color;
    });

    settingsBox.append(bgPicker, boxPicker);
    app.append(settingsBox);

    const counterContainer = document.createElement('div');
    counterContainer.id = "counter-container";
    counterContainer.style.backgroundColor = localStorage.getItem('user-box-color') || "#ffffff";

    const btnMinus = document.createElement('button');
    btnMinus.textContent = "-";
    
    const display = document.createElement('h2');
    display.id = "counter-display";
    display.textContent = counter;

    const btnPlus = document.createElement('button');
    btnPlus.textContent = "+";

    counterContainer.append(btnMinus, display, btnPlus);
    app.append(counterContainer);

    const gifArea = document.createElement('div');
    gifArea.id = "gif-area";
    app.append(gifArea);

    btnPlus.onclick = () => { counter++; updateUI(); };
    btnMinus.onclick = () => { if(counter > 0) counter--; updateUI(); };

    function updateUI() {
        display.textContent = counter;
        if (type === "fun") {
            handleFunMode(counter, gifArea, counterContainer);
        }
    }
}

// Helper per i selettori colore con LocalStorage
function createColorPicker(label, storageKey, callback) {
    const container = document.createElement('div');
    const lbl = document.createElement('span');
    lbl.textContent = label + " ";
    const input = document.createElement('input');
    input.type = "color";
    input.value = localStorage.getItem(storageKey) || (label === "Box" ? "#ffffff" : "#f8fafc");
    
    input.oninput = () => {
        localStorage.setItem(storageKey, input.value);
        callback(input.value);
    };
    
    container.append(lbl, input);
    return container;
}

function handleFunMode(val, gifArea, container) {
    const thresholds = [1, 5, 10, 25, 50, 100];
    gifArea.innerHTML = "";
    
    if (thresholds.includes(val)) {
        const img = document.createElement('img');
        img.src = `img/${val}.gif`;
        img.style.width = "100%";
        img.style.borderRadius = "1rem";
        gifArea.append(img);
    }

    // Scherzi
    if (val === 23) {
        document.body.classList.add("shake-animation");
        setTimeout(() => document.body.classList.remove("shake-animation"), 2000); 
    }
    container.style.flexDirection = (val === 55) ? "row-reverse" : "row"; 
}

function showWorkInProgress() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <button class="btn-back" onclick="mainMenu()">← Menu</button>
        <h1>Under Construction</h1>
        <div id="gif-area"><img src="img/working.gif" style="width:100%; border-radius:1rem;"></div>
    `;
}