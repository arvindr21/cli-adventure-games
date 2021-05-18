import * as inquirer from 'inquirer';

import { COLORS, KEYWORDS } from "../utils/globals";
import { Meta, Room, RoomMap, Script } from "../models/script";

import { $GetJSONFileContents } from "../utils/helper";

/**
 * @description
 * @author Arvind Ravulavaru
 * @date 2021-05-15
 * @export
 * @class GameEngine
 */
export default class GameEngine {
    inventory: any = {};
    currentRoom: RoomMap;
    keywords: string[] = KEYWORDS;
    rooms: RoomMap[];
    meta: Meta;
    path: string;

    /**
     *Creates an instance of GameEngine.
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @param {string} path
     * @memberof GameEngine
     */
    constructor(path: string) {
        this.path = path;
        this.rooms = [];
        this.currentRoom = {} as RoomMap;
        this.meta = {} as Meta;
    }

    /**
     * @description
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @memberof GameEngine
     */
    async play() {
        const script: Script = await $GetJSONFileContents(this.path);
        this.rooms = script.rooms;
        this.meta = script.meta;
        this.kickoff();
    }

    kickoff(){
        console.log('  Loading ' + COLORS.BOLDRED(" ** " + this.meta.name + " ** "), '.....', '\n');

        setTimeout(() => {
            console.log(COLORS.BOLDRED(" ** " + this.meta.name + " ** "), "-", COLORS.BLUE(this.meta.tagline), '\n');
            console.log('  Developed by ' + COLORS.MAGENTA(this.meta.author), '\n');
            console.log("  " + this.meta.welcome + "");
            console.log(COLORS.CYAN("  The game begins now!"));
            this.currentRoom = this.rooms[0];
            this.runner();
          }, 1500); // let the user read the intro and help text + Effect of a loading
    }

    runner(){
        let room: Room = {} as Room;

        let roomKey = Object.keys(this.currentRoom)[0]; //always pick the first one, incase more than one is defined
        room = this.currentRoom[roomKey];
        room.name = roomKey;

        inquirer.prompt([{
            name: 'command',
            message: room.description
        }]).then((answer: any) => {
            console.log(answer);
        })

    }

}