import { black, blue, bold, cyan, green, magenta, red } from "chalk";
export const GAMES_SCRIPTS = `${__dirname}/../scripts`;
export const GAMES_SCRIPTS_EXT_GLOB = `**.json`;
export const GAMES_SCRIPTS_META_PROP = `meta`;

export const KEYWORDS = ['help', 'info', 'inventory', 'save', 'restore', 'throw', 'drop', 'take', 'pick', 'get', 'use', 'move', 'nothing'];

export const COLORS = {
    RED: red,
    BOLDRED: bold.red,
    GREEN: green,
    BLACK: black.bgWhite,
    BLUE: blue,
    MAGENTA:magenta,
    CYAN: cyan
}