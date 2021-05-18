import * as inquirer from 'inquirer';

import { Command, flags } from '@oclif/command'

import { $GetAllGames } from '../utils/helper';
import { Game } from '../models/game';
import GameEngine from '../engine';

export default class Play extends Command {
    static description = 'play cli-adventure-games'
    /**
     * @description
     * @static
     * @memberof Play
     */
    static flags = {
        help: flags.help({ char: 'h' }),
        name: flags.string({ char: 'n', description: 'name of the game to play' })
    }

    /**
     * @description
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @memberof Play
     */
    showBanner(): void {
        this.log(' ** Text Based Adventure Games ** \n');
        this.log(' Developed for the people with the  world\'s most powerful graphic chip - Imagination \n');
    }
    /**
     * @description
     * @author Arvind Ravulavaru
     * @date 2021-05-15
     * @returns
     * @memberof Play
     */
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

        if (flags.name) {
            const gamesFound: Game[] = games.filter(opt => opt.meta.name === flags.name);
            if (gamesFound.length === 1) {
                this.log(`Game found, launching game ${flags.name}\n`)
                const game = new GameEngine(gamesFound[0].path);
                game.play();
                return;
            }
        }

        inquirer.prompt(
            [{
                type: 'list',
                name: 'game',
                message: 'Which Adventure would you like to go for?',
                choices: gameOptions
            }]).then(
               async (answers) => {
                    const game = new GameEngine(games[answers.game].path);
                    await game.play();
                });
    }
}


