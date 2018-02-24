import mars from './mars.js';
var marsRover = new mars({x: 0, y: 0}, 'N');

marsRover.receiveCommands('F','L');
console.log('We in here');