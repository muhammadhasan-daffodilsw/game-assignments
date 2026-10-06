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

    load_passenger(type){

        let currentCannibals ,currentMissionaries = this.find_available_cnt();

        if ((type == 'missionary' && currentMissionaries == 0) || (type == 'cannibal' && currentCannibals == 0))
        {
            window.alert(`There is no ${type} on this bank`);
        }

        if (type == 'missionary')
        {
            if (this.boat.side == 'left')
            {
                this.missionary_left --;
                this.missionary_right ++;
            }
            else{
                this.missionary_left ++;
                this.missionary_right --;
            }
        }

        if (type == 'cannibal')
        {
            if (this.boat.side == 'left')
            {
                this.cannibal_left --;
                this.cannibal_right ++;
            }
            else{
                this.cannibal_left ++;
                this.cannibal_right --;
            }
        }

    }

    unload_passenger(type){

    }




    check_game_state(){
        if (this.missionary_left == 0)
        {
            return true;
        }
        if (this.missionary_left<this.cannibal_left || this.missionary_right<this.cannibal_right)
        {
            return false;
        }
    }

    advance_turn()
    {

    }


}

