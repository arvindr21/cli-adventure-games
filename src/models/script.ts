// https://app.quicktype.io/
// To parse this data:
//
//   import { Convert, Script } from "./file";
//
//   const script = Convert.toScript(json);

export interface Script {
    meta:  Meta;
    rooms: Room[];
}

export interface Meta {
    name:    string;
    author:  string;
    email:   string;
    tagline: string;
    welcome: string;
}

export interface Room {
    alias:          string;
    description:    string;
    contextualHelp: string;
    actions:        null;
    isExitRoom:     boolean;
    exits:          Exits;
    objects:        null;
    enemies:        null;
}

export interface Exits {
    north: number;
    east:  number;
    south: number;
    west:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toScript(json: string): Script {
        return JSON.parse(json);
    }

    public static scriptToJson(value: Script): string {
        return JSON.stringify(value);
    }
}
