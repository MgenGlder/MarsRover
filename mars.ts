/** 
 * Represents a mars rover.
 * @author Kunle Oshiyoye
 * @constructor
 * @param {object} currentLocation - starting location of the rover
 * @param {string} directionFacing - starting direction (N, W, E, S)
 * @param {array}  obstackes       - array of coordinates of obstacles
 * @param {object} grid            - object that contains max x and y values of the grid that the rover 
 *                                 - is on.
*/
export class mars {
    commands: String[] = [];

    constructor(public currentLocation: { x: number, y: number } = { x: 0, y: 0 }, 
                public directionFacing: string, 
                public obstacles: { x: number, y: number}[] = [ { x: 1, y: 1 }, { x: 0, y: 3 }],
                public grid: { x: number, y: number } = { x: 10, y: 10 }) { }

    // Public method that takes as input an array of uppercase legal commands
    // for movement of the rover. Ex: ['F', 'B', 'L', 'R'];
    public receiveCommands(commands: string[]) {
        this.commands = commands;
        for (let command of commands) {
            this.move(command);
        }
    }
    
    // Private helper method that handles the logic behind the move.
    private move(command: string) {
        if (typeof command !== 'string') {
            console.log('Error, expected string');
            return;
        }
        if (command === 'F' || command === 'B') {
            let xIncreaseAmount = 0; let yIncreaseAmount = 0;

            switch (this.directionFacing) {
                case 'N':
                    yIncreaseAmount = 1;
                    break;
                case 'S':
                    yIncreaseAmount = -1;
                    break;
                case 'E':
                    xIncreaseAmount = 1;
                    break;
                case 'W':
                    xIncreaseAmount = -1;
                    break;
            }

            if (command === 'B'){
                yIncreaseAmount = yIncreaseAmount * -1;
                xIncreaseAmount = xIncreaseAmount * -1;
            }

            this.updateCurrentLocation(xIncreaseAmount, yIncreaseAmount);
            return;
        }
        else if (command === 'L' || command === 'R') {

            this.updateCurrentDirection(command);
            return;
        }
        else {
            console.log('Invalid input, expected F, B, L or R');
            return;
        }
        // string is a primitive, String is an object wrapper
    }

    // Helper method to handle the specific logic of updating the user location
    // if they are moving forwards or backwards.
    private updateCurrentLocation(xChangeAmount: number, yChangeAmount: number) {
        let potentialMoveX = this.currentLocation.x;
        let potentialMoveY = this.currentLocation.y;

        potentialMoveX += xChangeAmount;
        potentialMoveY += yChangeAmount;

        for (let obstacle of this.obstacles) {
            if( obstacle.x == potentialMoveX && obstacle.y == potentialMoveY ) {
                this.updateCurrentLocation(xChangeAmount, yChangeAmount + 1);
                return;
            }
        }
        
        this.currentLocation.x = potentialMoveX;
        this.currentLocation.y = potentialMoveY;
        

        if (this.currentLocation.x < 0) {
            this.currentLocation.x = (this.grid.x + 1) + this.currentLocation.x;
        } else if (this.currentLocation.x > this.grid.x) {
            this.currentLocation.x %= (this.grid.x + 1);
        }
        if (this.currentLocation.y < 0){
            this.currentLocation.y = (this.grid.y + 1) + this.currentLocation.y;
        } else if (this.currentLocation.y > this.grid.y) {
            this.currentLocation.y %= (this.grid.y + 1);
        }
    }

    // Helper method that handles direction change ('L', 'R')
    private updateCurrentDirection(command) {
        let directionMap = ['N', 'E', 'S', 'W'];
        let directionIndex = directionMap.indexOf(this.directionFacing);
        if (command === 'L') 
            this.directionFacing = directionMap[((directionIndex + 4) - 1) % 4]
        else
            this.directionFacing = directionMap[(directionIndex + 1) % 4];
    }
}

