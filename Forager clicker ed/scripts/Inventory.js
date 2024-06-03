
export default class Inventory {
    slots = [];
    items = {};

    constructor() {
        this.slots = [];
        this.items = {};
        fetch("./json/items.json")
            .then((response) => response.json())
            .then((data) => {
                this.items = data.items;
                console.log(this.items);
            }).then(() => {
                this.addToInventory("stone_sword");
            }).catch((err) => console.log(err));

    }

    //setInventory: Crea la UI de inventario
    setInventory() {
        const inventoryUI = document.getElementById("inventory");
        inventoryUI.innerHTML = "";
        for (let index = 0; index < this.slots.length; index++) {
            const slot = document.createElement("div");
            const amount = document.createElement("p");
            amount.textContent = this.slots[index]?.quantity ?? 0
            slot.id = `slot${index}`
            slot.classList = "slot";
            slot.addEventListener("click", () => {
                slot.classList.toggle("selected");
            })
            inventoryUI.appendChild(slot);
            slot.appendChild(amount);
        }
    }
    //update inventory: Actualiza la UI de inventario
    updateInventory() {
        const inventoryUI = document.getElementById("inventory");
        this.setInventory();
        for (let i = 0; i < this.slots.length; i++) {
            const slot = document.getElementById(`slot${i}`);
            if (this.slots[i]) {
                const img = document.createElement("img");
                img.alt = this.slots[i].quantity;
                img.src = "" + this.items[this.slots[i].item]?.image;
                slot.appendChild(img);
            }
        }
    }
    //addToInventory: Agrega un item al inventario
    addToInventory(item) {
        let isInInventory = false;
        //search if item is in inventory
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item === item) {
                this.slots[i].quantity += 1;
                isInInventory = true;
                break;
            }
        }//if item is not in inventory
        if (!isInInventory) {
            this.slots.push({ item: item, quantity: 1 });
        }
        
        this.updateInventory();
    }

}