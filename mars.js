"use strict";
exports.__esModule = true;
/**
 * Represents a mars rover.
 * @constructor
 * @param {object} currentLocation - starting location of the rover
 * @param {string} directionFacing - starting direction (N, W, E, S)
 * @param {array}  obstackes       - array of coordinates of obstacles
 * @param {object} grid            - object that contains max x and y values of the grid that the rover
 *                                 - is on.
*/
var mars = /** @class */ (function () {
    function mars(currentLocation, directionFacing, obstacles, grid) {
        if (currentLocation === void 0) { currentLocation = { x: 0, y: 0 }; }
        if (obstacles === void 0) { obstacles = [{ x: 1, y: 1 }, { x: 0, y: 3 }]; }
        if (grid === void 0) { grid = { x: 10, y: 10 }; }
        this.currentLocation = currentLocation;
        this.directionFacing = directionFacing;
        this.obstacles = obstacles;
        this.grid = grid;
        this.commands = [];
    }
    mars.prototype.receiveCommands = function (commands) {
        this.commands = commands;
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            this.move(command);
        }
    };
    mars.prototype.move = function (command) {
        if (typeof command !== 'string') {
            console.log('Error, expected string');
            return;
        }
        if (command === 'F' || command === 'B') {
            var xIncreaseAmount = 0;
            var yIncreaseAmount = 0;
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
            if (command === 'B') {
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
    };
    mars.prototype.updateCurrentLocation = function (xChangeAmount, yChangeAmount) {
        var potentialMoveX = this.currentLocation.x;
        var potentialMoveY = this.currentLocation.y;
        potentialMoveX += xChangeAmount;
        potentialMoveY += yChangeAmount;
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            if (obstacle.x == potentialMoveX && obstacle.y == potentialMoveY) {
                this.updateCurrentLocation(xChangeAmount, yChangeAmount + 1);
                return;
            }
        }
        this.currentLocation.x = potentialMoveX;
        this.currentLocation.y = potentialMoveY;
        if (this.currentLocation.x < 0) {
            this.currentLocation.x = (this.grid.x + 1) + this.currentLocation.x;
        }
        else if (this.currentLocation.x > this.grid.x) {
            this.currentLocation.x %= (this.grid.x + 1);
        }
        if (this.currentLocation.y < 0) {
            this.currentLocation.y = (this.grid.y + 1) + this.currentLocation.y;
        }
        else if (this.currentLocation.y > this.grid.y) {
            this.currentLocation.y %= (this.grid.y + 1);
        }
    };
    mars.prototype.updateCurrentDirection = function (command) {
        var directionMap = ['N', 'E', 'S', 'W'];
        var directionIndex = directionMap.indexOf(this.directionFacing);
        if (command === 'L')
            this.directionFacing = directionMap[((directionIndex + 4) - 1) % 4];
        else
            this.directionFacing = directionMap[(directionIndex + 1) % 4];
    };
    return mars;
}());
exports.mars = mars;
