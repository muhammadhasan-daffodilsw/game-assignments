class Boat{

    constructor(){
        this.side = 'left'
        this.cannibals= 0
        this.missionaries=0
        this.element = document.getElementById('boat');
    }


    move_boat(direction)
    {

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
    }


    check_game_state() {
        const side = this.boat.side;

        let leftTotalCannibals;
        let leftTotalMissionaries;
        let rightTotalCannibals;
        let rightTotalMissionaries;

        if (side === 'left') {
            leftTotalCannibals = this.cannibal_left + this.boat.cannibals;
            leftTotalMissionaries = this.missionary_left + this.boat.missionaries;

            rightTotalCannibals = this.cannibal_right;
            rightTotalMissionaries = this.missionary_right;
        } else {
            leftTotalCannibals = this.cannibal_left;
            leftTotalMissionaries = this.missionary_left;

            rightTotalCannibals = this.cannibal_right + this.boat.cannibals;
            rightTotalMissionaries = this.missionary_right + this.boat.missionaries;
        }

        if (
            leftTotalCannibals > 0 &&
            leftTotalMissionaries > 0 &&
            leftTotalCannibals > leftTotalMissionaries
        ) {
            alert('You Lose');
            return 'End';
        }

        if (
            rightTotalCannibals > 0 &&
            rightTotalMissionaries > 0 &&
            rightTotalCannibals > rightTotalMissionaries
        ) {
            alert('You Lose');
            return 'End';
        }

        return 'Continue';
    }

    advance_turn()
    {
        if (this.boat.cannibals+this.boat.missionaries == 0)
        {
            alert('Boat must have one passenger');
            return;
        }

        this.boat.move_boat();
        let state = this.check_game_state();
    }


}

let game = new GameController()


