# CLI Adventure Games [![Build Status](https://secure.travis-ci.org/arvindr21/cli-adventure-games.png?branch=master)](https://travis-ci.org/arvindr21/cli-adventure-games) [![NPM version](https://badge-me.herokuapp.com/api/npm/cli-adventure-games.png)](http://badges.enytc.com/for/npm/cli-adventure-games) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/arvindr21/cli-adventure-games/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


[![NPM](https://nodei.co/npm/cli-adventure-games.png?downloads=true&stars=true)](https://nodei.co/npm/cli-adventure-games/)

Text Based Adventure Games built with Node.js

> "_It runs on the world's most powerful graphic chip - Imagination_" - Sheldon Cooper

This module is inspired by amazing text based adventure games like [Zork](http://www.infocom-if.org/downloads/downloads.html). 

The game engine is still in active development and supports only basic features. 

_Pull requests and Game Scripts welcome!_

## Installation
Run 
```bash
$ [sudo] npm install -g cli-adventure-games
```

To play, execute
```bash
$ cli-adventure-games
```

## For players
Pick a Game script to start off. 
![player demo](https://raw.githubusercontent.com/arvindr21/cli-adventure-games/master/demos/demo_player.gif)

You will be shown help instructions before you start the game. At any point, you can type `help` to get help.


## For developers
There is a Game Script, that is fed into the Game Engine. The script file is a JSON, that consists of how the game should work. The game engine describes the scenarios listed in the JSON to the player, takes his input and acts accordingly.

You can either contribute to the Game Script, by building one of your own games or you can contribute to the engine as well. 

To create your own game script, please refer to the `Maya.json` in the `Games` folder.

PS : Please check with the me/contributors before updating the engine.

### Todos :  
[ ] Save & Restore Game
[ ] Player interaction with the objects (_use swords or rocket launchers_)
[ ] Implement Lexical processing of commands
[ ] Build game scripts for Zork I, Zork II and Zork III

Special thanks to Anurag Jain & Jayesh Choudhari for their advice and contributions. 

## License

Copyright (c) 2014 Arvind Ravulavaru, contributors.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
