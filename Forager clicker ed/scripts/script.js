import Inventory from "./Inventory.js";
/*Declared Constants*/
const optionMenuBtn = document.getElementById("options-menu-button");
const options = document.getElementById("options-menu");
const optionsBack = document.getElementById("options-back-button");
const mainMenu = document.getElementById("main-menu");
const startGame = document.getElementById("start-game-button");

const gameArea = document.getElementById("game-area");
const ui = document.getElementById("ui");
const inventory = new Inventory();
let items;
fetch("./json/items.json")
    .then((response) => response.json())
    .then((data) => {
        items = data.items;
    })
    .catch((err) => console.log(err));

/*Entities*/
const entities = {
    tree: {
        image: "./img/tree.png",
        hits: 3,
        drop: "wood"
    },
    stone: {
        image: "./img/stone.png",
        hits: 5
    }
}



/*EventListeners*/

optionsBack.addEventListener("click", () => {
    options.classList.add("hidden");
    mainMenu.classList.remove("hidden");
});

optionMenuBtn.addEventListener("click", () => {
    options.classList.remove("hidden");
    mainMenu.classList.add("hidden");
});

startGame.addEventListener("click", () => {
    options.classList.add("hidden");
    mainMenu.classList.add("hidden");
    setGameArea();
})

function setGameButtons() {
    const leftButtons = document.createElement("div");
    leftButtons.classList.add("left-menu");

    const optionMenuBtn = document.createElement("button");
    optionMenuBtn.id = "options-menu-button";
    optionMenuBtn.textContent = "Opciones";

    const inventoryBtn = document.createElement("button");
    inventoryBtn.id = "inventory-button";
    inventoryBtn.textContent = "Inventario";
    inventoryBtn.addEventListener("click", () => {
        const inventoryUI = document.getElementById("inventory");
        if (inventoryUI.classList.contains("hidden")) {
            inventoryUI.classList.remove("hidden");
        } else {
            inventoryUI.classList.add("hidden");
        }
    })

    leftButtons.appendChild(optionMenuBtn);
    leftButtons.appendChild(inventoryBtn);
    gameArea.appendChild(leftButtons);
};
/*Set game area: set the game area*/
function setGameArea() {
    gameArea.classList.add("fullscren");

    setGameButtons();
    generateIsland();
    populateIsland();

    inventory.setInventory();
    setUi();
}
/*Generate island: Generate 8x8 grid of tiles*/
function generateIsland() {
    const island = document.createElement("div");
    island.classList.add("island");
    for (let i = 0; i < 64; i++) {
        const floor = document.createElement("div");
        floor.classList.add("floor");

        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (Math.random() > 0.5) {
            tile.classList.add("grass");
        } else {
            tile.classList.add("water");
        }

        floor.appendChild(tile);
        island.appendChild(floor);
    }
    gameArea.appendChild(island);
}

function setUi() {
    /*Activa inventory*/
    const inventoryUI = document.createElement("div");
    inventoryUI.id = "active-inventory";
    ui.appendChild(inventoryUI);

    for (let index = 0; index < 5; index++) {
        const slot = document.createElement("div");
        slot.id = `active-slot${index}`
        slot.classList = "slot";
        slot.addEventListener("click", () => {
            slot.classList.toggle("selected");
        })
        inventoryUI.appendChild(slot);
    }
}
function elementSpawner(entity) {
    const element = document.createElement("img");
    element.src = entity.image;
    element.alt = entity.hits;
    element.style = "height: 100%; width: 100%;";
    element.addEventListener("click", () => {
        if (element.alt > 1) {
            element.alt--;
            element.classList.add("hitted");
            setTimeout(() => {
                element.classList.remove("hitted");
            }, 200);
        } else {
            element.classList.add("destroyed");
            setTimeout(() => {
                element.classList.remove("destroyed");
                element.remove();
                inventory.addToInventory(entity.drop);
                console.log(inventory.slots)
            }, 190);

        }
    })
    return element;
}

function populateIsland() {
    const grassTile = document.getElementsByClassName("grass");
    for (let i = 0; i < grassTile.length; i++) {
        if (Math.random() > 0.5) {
            grassTile[i].appendChild(elementSpawner(entities.tree));
        }
    }
}


