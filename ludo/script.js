class GridCell {
    constructor(i, element) {
        this.i = i;
        this.element = element;

        this.pathIndex = null;
        this.pawn = null;
        this.type = "empty";
    }
}


const gridMap = {};
const path = [
    91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7, 8,
    23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104,
    119, 134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218, 217, 216, 201,
    186, 171, 156, 141, 125, 124, 123, 122, 121, 120,
    105, 90
];

const starting_idx = {
    0: 91, 
    1: 23,   
    2: 133,  
    3: 201   
};

const colorMap = {
    0 :'B', 1 : 'R', 2 : 'G', 3 : 'Y'
}

const home_idx = {
    0: [16, 19, 61, 64],    
    1: [25, 28, 70, 73],      
    2: [151, 154, 196, 199],   
    3: [160, 163, 205, 208]    
};

function load_grid() {
    const gridContainer = document.getElementById('grid-container');

    for (let i = 0; i < 225; i++) {
        const child = document.createElement('div');
        child.classList.add("grid-item");

        const row = Math.floor(i / 15);
        const col = i % 15;

        if (row < 6 && col < 6) {
            child.classList.add("home-blue");
        }
        else if (row < 6 && col > 8) {
            child.classList.add("home-red");
        }
        else if (row > 8 && col < 6) {
            child.classList.add("home-green");
        }
        else if (row > 8 && col > 8) {
            child.classList.add("home-yellow");
        }

        if (row > 5 && row < 9 && col > 5 && col < 9) {
            child.classList.add("center");
        }

        gridMap[i] = new GridCell(i,child);

        gridContainer.appendChild(child);
    }
}

load_grid();

function placePawn(id) {
    const indices = home_idx[id];
    let pawn_elements = []
    for (const i of indices) {
        const pawn = document.createElement("div");

        pawn.classList.add("pawn");
        pawn.classList.add(colorMap[id]);

        gridMap[i].element.appendChild(pawn);
        pawn_elements.push(pawn);
    }
    return pawn_elements;
}



class Pawn {
    constructor(id, playerId, homePosition, element) {
        this.id = id;
        this.playerId = playerId;

        this.position = homePosition;
        this.element = element;

        this.state = "home";
    }
}



class Player {
    constructor(color_id) {
        this.id = color_id;
        this.startingPosition = starting_idx[this.id];
        this.targetPawns = 0;
        this.pawns = [];
        this.loadPawns();
    }

    loadPawns() {
        const pawn_elements = placePawn(this.id);
        const positions = home_idx[this.id];

        for (let i = 0; i < 4; i++) {
            const pawn = new Pawn(
                i,
                this.id,
                positions[i],
                pawn_elements[i]
            );

            pawn.element.addEventListener("click", () => {
                console.log(pawn)
                game.selectPawn(pawn);
            });

            this.pawns.push(pawn);
        }
    }



    get homePawns() {
        return this.pawns.filter(pawn => pawn.state === "home").length;
    }

    get activePawns() {
        return this.pawns.filter(pawn => pawn.state === "active").length;
    }
}


class GameController {
    constructor(player_cnt) {
        this.player_cnt = player_cnt;
        this.players = [];
        this.turn = 0;
        this.selectedPawn = null;
        this.currentRoll = null;

        this.loadPlayers();
        this.setupEvents();
    }

    setupEvents() {
        document
            .getElementById('roll-die')
            .addEventListener('click', () => this.rollDie());
    }

    loadPlayers() {
        for (let i = 0; i < this.player_cnt; i++) {
            const player = new Player(i);
            this.players.push(player);
        }
    }

    rollDie() {
        if (this.currentRoll) return;

        this.currentRoll = Math.floor(Math.random() * 6) + 1;
        console.log(this.currentRoll);
    }

    selectPawn(pawn) {
        if (pawn.playerId !== this.turn) {
            console.log('Not Turn');
            return;
        }

        if (this.selectedPawn) {
            this.selectedPawn.element.style.border = '';
        }

        pawn.element.style.border = '2px solid green';
        this.selectedPawn = pawn;
    }

    advanceTurn()
    {
        if (!this.currentRoll || !this.selectedPawn)
        {
            return;
        }

        this.selectedPawn.element.style.border = '';

        this.turn = (this.turn + 1) % this.player_cnt;

        this.currentRoll = null;
        this.selectedPawn = null;
    }

    moveSelectedPawn()
    {

        let currPlayer = this.players[this.turn]
        if (!this.currentRoll || !this.selectedPawn)
        {
            return;
        }
        if (this.selectedPawn.state === 'home' && this.currentRoll < 6)
        {
            alert('Invalid Move');
            return;
        }
        let moveTo = -1;
        if (this.selectedPawn.state === 'home')
        {
            moveTo = currPlayer.startingPosition;
        }
        else{
            moveTo=this.selectedPawn.position;
        }
    }
}


let game = new GameController(3)