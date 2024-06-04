const islandSize = 8;
export default class Island {
    
    tiles;
    constructor() {
        this.tiles = [];
        for (let i = 0; i < islandSize; i++) {
            this.tiles.push([]);
            for (let j = 0; j < islandSize; j++) {
                this.tiles[i].push((Math.random() > 0.5)?1:0);
            }
        }
        
    }
    /*returns a HTML div with the island*/
    islandView(){
        
        const island = document.createElement("div");
        island.classList.add("island");
            for (let i = 0; i < this.tiles.length; i++) {
                for (let j = 0; j < this.tiles[i].length; j++) {
                    const floor = document.createElement("div");
                    floor.classList.add("floor");
        
                    const tile = document.createElement("div");
                    tile.classList.add("tile");
        
                    if (this.tiles[i][j] == 1) {
                        tile.classList.add("grass");
                    } else {
                        tile.classList.add("water");
                    }
                    floor.appendChild(tile);
                    island.appendChild(floor);
                }
                
            }
            console.log(this.tiles);
        return island;
    }
}