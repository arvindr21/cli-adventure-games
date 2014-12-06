var utils = require('./utils');
var inquirer = require("inquirer");
var Table = require('cli-table');

var c = utils.colors;

function Game() {
  this.inventory = {};
  this.score = 0;
  this.currentRoom = {};
  this.keyWords = ['help', 'info', 'inventory', 'score', 'save', 'restore', 'throw', 'drop', 'take', 'pick', 'use', 'move', 'nothing'];
}

Game.prototype.play = function(gsPath) { //Game Script Path
  var script = utils.parser(gsPath);
  this.rooms = script.rooms;
  this.kickOff(script.name, script.meta);
};

Game.prototype.help = function() {
  console.log('\n', c.blue('  This is text based adventure game inspired by Zork. You can find a set of commands below that will help you navigate around the game.', '\n'));
  console.log(c.green('  Rules of the road : '), '\n');
  console.log(('  *  You enter the below commands to progress the game '));
  console.log(('  *  A command is 2 word phrase consisting of a verb and an object/direction '));
  console.log(('  *  Examples `go east` or `pick bottle` '));
  console.log(('  *  The first word should always be a verb and the second word an object '));
  console.log(('  *  You can navigate around the game using East, West, North and South '));
  console.log(('  *  You can Pick objects, Throw Objects and Use objects based on the context of the game  '), '\n');

  var table = new Table({
    chars: utils.tableChars
  });

  table.push(
    [c.green('command'), c.green('description')], ['help', 'To see these instructions'], ['info', 'To see the help based on your game state'], ['inventory', 'You can see all the items you have collected here'], ['score', 'Your score based on how you are playing the game'], ['save', 'Save the game'], ['restore', 'Restore the game']
  );
  console.log(table.toString(), '\n');
}

Game.prototype.kickOff = function(name, meta) {
  var self = this;

  self.help();
  console.log('  Loading ' + c.boldred(" ** " + name + " ** "), '.....', '\n');
  setTimeout(function() {
    console.log(c.boldred(" ** " + name + " ** "), "-", c.blue(meta.tagline), '\n');
    console.log('  Developed by ' + c.magenta(meta.author), '\n');
    console.log("  " + meta.welcome + "");
    console.log("\n");
    console.log(c.cyan("  The game begins now!"));
    self.executer(self.rooms[0]);
  }, 2999); // let the user read the intro and help text + Effect of a loading

};


Game.prototype.executer = function(room) {
  var _r = {},
    self = this;

  _r.actions = {};


  Object.keys(room).forEach(function(k, v) {
    _r = room[k];
    _r.name = k
  });

  if (_r.exits) {
    Object.keys(_r.exits).forEach(function(k, v) {
      if (parseInt(_r.exits[k]) != -1) {
        _r[k] = _r["go " + k] = _r.exits[k];
      } else {
        _r[k] = _r["go " + k] = "nothing"
      }
    });
  }

  if (_r.actions) {
    Object.keys(_r.actions).forEach(function(k, v) {
      _r.actions[k] = _r.actions[k];
    });
  }

  if (_r.objects) {
    Object.keys(_r.objects).forEach(function(k, v) {
      _r[k] = _r.objects[k];
    });
  }

  if (_r.enemies) {
    Object.keys(_r.enemies).forEach(function(k, v) {
      _r[k] = _r.enemies[k];
    });
  }

  if (_r.meta) {
    Object.keys(_r.meta).forEach(function(k, v) {
      _r[k] = _r.meta[k];
    });
  }

  // cleanup unused vars
  delete _r.exits;
  delete _r.actions;
  delete _r.objects;
  delete _r.enemies;

  self.currentRoom = room;

  if ((_r.isExitRoom && _r.isExitRoom.toString()) === "true") {
    console.log(_r.description);
    return false;
    process.exit(0);
  }

  self.prompt(_r.description, function(response) {
    if (response.input.trim().length == 0) {
      console.log(c.red('You can do better than that.. '));
      self.executer(room);
    } else if (self.keyWords.indexOf(response.input) >= 0 || self.keyWords.indexOf(response.input.split(' ')[0]) >= 0) { // check for keywords
      self.processKeyword(response.input, room, _r);
    } else if (_r[response.input]) { // direct commands
      self.feeder(_r[response.input]);
    } else {
      var filterWords = ['fuck', 'crap', 'shit'];
      if (filterWords.indexOf(response.input) >= 0) {
        var msgs = [
          'huh!!',
          'Yeah.. and what!!',
          'You kiss your mother with that mouth!'
        ];
        console.log(c.boldred(msgs[Math.ceil(Math.random() * msgs.length) - 1]), '\n');
      } else {
        var msgs = [
          'Sorry what???',
          'Pardon me..'
        ];
        console.log(c.magenta(msgs[Math.ceil(Math.random() * msgs.length) - 1]), '\n');
      }
      self.executer(room);
    }
  });
}

Game.prototype.feeder = function(roomName) {
  var self = this,
    found = false;

  Object.keys(self.rooms).forEach(function(key) {
    var _r = self.rooms[key];
    if (found) return;

    if (roomName == 'nothing') {
      found = true;
      console.log('Looks like there is nothing here..');
      return self.executer(self.currentRoom);
    }

    Object.keys(_r).forEach(function(k, v) {
      if (k === roomName) {
        found = true;
        return self.executer(_r);
      }
    });
  });

  // > No rooms with the provided name found
  // Warn the player that the game is incomplete and terminate
  if (!found) {
    console.log('Oops.. looks like the game is not completely developed! :/');
  }
};

Game.prototype.prompt = function(text, callback) {
  var p = {
    type: "input",
    name: "input",
    message: text ? text : 'The Room description is empty :('
  };
  console.log('\n');
  inquirer.prompt([p], callback);
};

Game.prototype.processKeyword = function(response, room, _r) {
  var self = this;
  if (response == 'help') {
    self.help();
  } else if (response == 'info') {
    console.log(_r.contextualHelp || _r.description);
  } else if (response == 'inventory') {
    self.printInventory();
  } else if (response == 'score') {
    console.log('Your score is ' + self.score + '\n');
  } else if (response == 'save') {
    self.save();
  } else if (response == 'restore') {
    self.restore();
  } else if (response.split(" ")[0] == 'pick' || response.split(" ")[0] == 'take') {
    self.pick(_r, response.split(" ")[1]);
  } else if (response.split(" ")[0] == 'throw' || response.split(" ")[0] == 'drop') {
    self.throw(_r, response.split(" ")[1]);
  } else {
    if (response.split(" ").length < 1 || response.split(" ").length > 1) {
      console.log('Enter a verb and a action. Enter `help` for more info');
    } else {
      console.log('response >> ', response);
    }
  }
  this.executer(room);
};

Game.prototype.pick = function(room, item) {
  var self = this;
  if (room[item]) {
    self.inventory[item] = room[item];
    console.log(c.green('  Added ' + item + ' to inventory'));
  } else {
    console.log(c.red('  I can\'t find any ' + item + ' around ' + room.alias));
  }
};

Game.prototype.throw = function(room, item) {
  var self = this,
    iv = self.inventory;
  console.log(item, iv[item])
  if (iv[item]) {
    delete iv[item];
    console.log('  Updated inventory');
  } else {
    console.log(c.red('  I can\'t find any ' + item + ' in the inventory'));
  }
};

Game.prototype.printInventory = function() {
  var self = this;
  var items = Object.keys(self.inventory);
  var table = new Table({
    chars: utils.tableChars
  });

  if (items.length) {
    items.forEach(function(k, i) {
      table.push(
        [(i + 1), k]
      );
    });

  } else {
    table.push(
      ['No Items in your inventory yet!']
    );
  }
  console.log(table.toString(), '\n');
};

Game.prototype.save = function() {
  // save the game state
};

Game.prototype.restore = function() {
  // restore the game state
};

module.exports = new Game();
