export interface Script {
    meta:  Meta;
    rooms: RoomMap[];
}
export interface RoomMap { [key: string]: Room; }

export interface Meta {
    name:    string;
    author:  string;
    email:   string;
    tagline: string;
    welcome: string;
}

export interface Room {
    name: string;
    alias:  string;
    description:  string;
    contextualHelp:  string;
    actions:  ActionsMap | null;
    exits:  Exits;
    objects:  ObjectsMap | null;
    enemies:  EnemiesMap | null;
}

export interface ActionsMap { [key: string]: string; }
export interface ObjectsMap { [key: string]: string; }
export interface EnemiesMap { [key: string]: string; }
export interface Exits {
    north: string;
    south: string;
    east: string;
    west: string;
 }