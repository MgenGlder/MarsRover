# MarsRover
A Mars Rover program that will allow you to move the rover with an array of commands.

Using TypeScript and Node.js


In order to run, you'll need Node.Js installed on your system. You don't necessarily need to have the typescript compiler installed globally. This was tested and run successfully with Node.js version 9.5.0

# Running it
* Navigate to the project folder (where mars.js is located).
* Enter *node* into your terminal or command prompt to bring up the node REPL
* Enter the following commands into your interactive node interface.
``` javascript
 var Rover = require('./mars');
 var vroom = new Rover.mars({x: 0, y: 0}, 'N');
 vroom.receiveCommands(['F', 'L', 'B']);
 vroom.currentLocation;
 vroom.directionFacing;
 ```
 
 You can play around with it, but with the _receiveCommands_ function on _vroom_ you are able to pass any array of movements as an array of capital character commands
 
 At any stage, you have access to _currentLocation_ and _directionFacing_ to view the current location (x, y) of the rover and the direction that the rover is currently facing.
