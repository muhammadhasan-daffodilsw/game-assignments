class Boat{

    constructor(){
        this.side = 'left'
        this.cannibals= 0
        this.missionaries=0
        this.element = document.getElementById('boat');
    }


   move_boat() {
        this.side = this.side === 'left' ? 'right' : 'left';

        if (this.side === 'right') {
            this.element.style.left = '80%';
        } else {
            this.element.style.left = '20px';
        }
}

    renderBoat() {
        const passengers = document.getElementById('boatPassengers');

        passengers.innerHTML = '';

        for (let i = 0; i < this.boat.missionaries; i++) {
            passengers.innerHTML += '<div class="missionary"></div>';
        }

        for (let i = 0; i < this.boat.cannibals; i++) {
            passengers.innerHTML += '<div class="cannibal"></div>';
        }
    }

}

class GameController{


    constructor(){
        this.cannibal_left = 3;
        this.missionary_left = 3;
        this.cannibal_right = 0;
        this.missionary_right=0;
        this.boat = new Boat();
        this.eventSetup();
        this.render()
    }

    eventSetup(){
        document.getElementById('addMissionary').addEventListener('click', () => this.load_passenger('missionary'));
        document.getElementById('removeMissionary').addEventListener('click', () => this.unload_passenger('missionary'));
        document.getElementById('addCannibal').addEventListener('click', () => this.load_passenger('cannibal'));
        document.getElementById('removeCannibal').addEventListener('click', () => this.unload_passenger('cannibal'));
        document.getElementById('advanceTurn').addEventListener('click', () => this.advance_turn());
    }

    find_available_cnt()
    {
        let currentCannibals = 0;
        let currentMissionaries = 0;

        if (this.boat.side == 'left')
        {
            currentCannibals = this.cannibal_left;
            currentMissionaries=this.missionary_left;
        }
        else{
            currentCannibals = this.cannibal_right;
            currentMissionaries=this.missionary_right;
        }

        return [currentCannibals,currentMissionaries];
    }

    load_passenger(type) {
        const [currentCannibals, currentMissionaries] = this.find_available_cnt();

        if (
            (type === 'missionary' && currentMissionaries === 0) ||
            (type === 'cannibal' && currentCannibals === 0)
        ) {
            window.alert(`There is no ${type} on this bank`);
            return;
        }

        if ((this.boat.cannibals + this.boat.missionaries) >= 2) {
            window.alert("No more than two passengers");
            return;
        }

        if (type === 'missionary') {
            this.boat.missionaries++;

            if (this.boat.side === 'left') {
                this.missionary_left--;
            } else {
                this.missionary_right--;
            }
        } else if (type === 'cannibal') {
            this.boat.cannibals++;

            if (this.boat.side === 'left') {
                this.cannibal_left--;
            } else {
                this.cannibal_right--;
            }
        }
        this.render();
    }

    unload_passenger(type) {
        if (
            (type === 'missionary' && this.boat.missionaries === 0) ||
            (type === 'cannibal' && this.boat.cannibals === 0)
        ) {
            window.alert(`There is no ${type} on the boat`);
            return;
        }

        if (type === 'missionary') {
            this.boat.missionaries--;
        } else if (type === 'cannibal') {
            this.boat.cannibals--;
        }

        if (this.boat.side === 'left') {
            if (type === 'missionary') this.missionary_left++;
            if (type === 'cannibal') this.cannibal_left++;
        } else {
            if (type === 'missionary') this.missionary_right++;
            if (type === 'cannibal') this.cannibal_right++;
        }
        this.render();
    }


    check_game_state() {
        const leftUnsafe =
            this.missionary_left > 0 &&
            this.cannibal_left > this.missionary_left;

        const rightUnsafe =
            this.missionary_right > 0 &&
            this.cannibal_right > this.missionary_right;

        if (leftUnsafe || rightUnsafe) {
            alert('You Lose');
            return 'End';
        }

        return 'Continue';
    }


    advance_turn()
    {
        if (this.cannibal_right+this.missionary_right == 6)
        {
            alert ('You Win');
            return;
        }
        if (this.boat.cannibals+this.boat.missionaries == 0)
        {
            alert('Boat must have one passenger');
            return;
        }

        this.boat.move_boat();
        let state = this.check_game_state();
        this.render();

    }

  render() {
    let leftBank = document.getElementById('leftBank');
    let rightBank = document.getElementById('rightBank');

    leftBank.innerHTML = '<h3>Left Bank</h3>';
    rightBank.innerHTML = '<h3>Right Bank</h3>';

    for (let i = 0; i < this.missionary_left; i++) {
        leftBank.innerHTML += '<div class="missionary"></div>';
;
    }

    for (let i = 0; i < this.cannibal_left; i++) {
        leftBank.innerHTML += '<div class="cannibal"></div>';
    }

    for (let i = 0; i < this.missionary_right; i++) {
        rightBank.innerHTML += '<div class="missionary"></div>';
    }

    for (let i = 0; i < this.cannibal_right; i++) {
        rightBank.innerHTML += '<div class="cannibal"></div>';
    }
}



}

let game = new GameController()


