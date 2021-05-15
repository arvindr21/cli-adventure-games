import * as JSONStream from "JSONStream";
import * as globby from "globby";

import { GAMES_SCRIPTS, GAMES_SCRIPTS_EXT_GLOB, GAMES_SCRIPTS_META_PROP } from "./globals";

import { Game } from "../models/game";
import { Meta } from "../models/script";
import { createReadStream } from "fs";

/**
 * @description Get JSON file contents of specific properties
 * @param {string} file
 * @param {string} [filter='']
 * @returns {Promise<Meta>}
 */
const $GetFileContents = (file: string, filter: string = ''): Promise<Meta> => {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(file, { encoding: 'utf-8' });
        const parser = JSONStream.parse([filter]);

        stream.pipe(parser);

        parser.on('data', function (data) {
            resolve(data);
        });

        parser.on('error', (err) => reject(err));
    });

}
/**
 * @description Get all games store in the `src/scripts` folder
 * @returns {Promise<Game[]>}
 */
export const $GetAllGames = async (): Promise<Game[]> => {
    return Promise.all((await globby(`${GAMES_SCRIPTS}/${GAMES_SCRIPTS_EXT_GLOB}`)).map(async (path: string) => {
        return {
            meta: await $GetFileContents(path, GAMES_SCRIPTS_META_PROP),
            path
        } as Game
    }))
}