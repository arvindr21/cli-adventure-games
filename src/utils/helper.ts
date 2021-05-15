import * as JSONStream from "JSONStream";
import * as globby from "globby";

import { GAMES_SCRIPTS, GAMES_SCRIPTS_EXT_GLOB, GAMES_SCRIPTS_META_PROP } from "./globals";
import { Meta, Script } from "../models/script";

import { Game } from "../models/game";
import { createReadStream } from "fs";

/**
 * @description Get JSON file contents of specific properties
 * @param {string} file
 * @param {string} [filter='']
 * @returns {Promise<Meta>}
 */
export const $GetJSONFileContents = (file: string, filter: string | undefined = undefined): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(file, { encoding: 'utf-8' });
        const parser = JSONStream.parse([filter]);
        stream.pipe(parser);
        parser.on('data', resolve);
        parser.on('error', reject);
    });

}

/**
 * @description Get all games store in the `src/scripts` folder
 * @returns {Promise<Game[]>}
 */
export const $GetAllGames = async (): Promise<Game[]> => {
    return Promise.all((await globby(`${GAMES_SCRIPTS}/${GAMES_SCRIPTS_EXT_GLOB}`)).map(async (path: string) => {
        return {
            meta: await $GetJSONFileContents(path, GAMES_SCRIPTS_META_PROP) as Meta,
            path
        } as Game
    }))
}