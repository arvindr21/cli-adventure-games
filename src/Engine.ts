import { Room, Script } from "./models/script";

import { $GetJSONFileContents } from "./utils/helper";
import { KEYWORDS } from "./utils/globals";

/**
 * @description
 * @author Arvind Ravulavaru
 * @date 2021-05-15
 * @export
 * @class GameEngine
 */
export default class GameEngine {
    inventory: any = {};
    score: number = 0;
    currentRoom: Room | undefined;
    keywords: string[] = KEYWORDS;
    rooms: Room[] | undefined;

    /**
     *Creates an instance of GameEngine.
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @param {string} path
     * @memberof GameEngine
     */
    constructor(path: string) {
        this.init(path);
    }
    /**
     * @description
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @param {string} path
     * @memberof GameEngine
     */
    async init(path: string) {
        const script: Script = await $GetJSONFileContents(path);
        this.rooms = script.rooms;
    }
    /**
     * @description
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @memberof GameEngine
     */
    play() {
        console.log(this);
    }

}