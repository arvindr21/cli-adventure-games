import * as inquirer from 'inquirer';

import { Command, flags } from '@oclif/command'

import { $GetAllGames } from '../utils/helper';
import { Game } from '../models/game';

export default class Play extends Command {
    static description = 'describe the command here'

    static flags = {
        help: flags.help({ char: 'h' }),
        // flag with a value (-n, --name=VALUE)
        name: flags.string({ char: 'n', description: 'name of the game to play' })
    }


    showBanner(): void {
        this.log(' ** Text Based Adventure Games ** \n');
        this.log(' Developed for the people with the  world\'s most powerful graphic chip - Imagination \n');
    }

    async run() {
        this.showBanner();
        const { flags } = this.parse(Play)
        const games: Game[] = await $GetAllGames();

        const gameOptions = games.map((game: Game, index: number) => {
            return {
                name: game.meta.name,
                value: index
            }
        })

        if (flags.name
            && gameOptions.filter(opt => opt.name === flags.name).length === 1) {
            console.log('Game found, launch game', flags.name, gameOptions)
        } else {
            if (flags.name) {
                this.log(`${flags.name} game was not found!! \n\n`)
            }
            inquirer.prompt(
                [{
                    type: 'list',
                    name: 'game',
                    message: 'Which Adventure would you like to go for?',
                    choices: gameOptions
                }]).then(
                     (answers) => {
                        this.log(games[answers.game].meta.name);
                    });
        }
    }
}


