import { Inject, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { CreateMatchInput } from 'src/dtos/createMatch.dto';
import Game from 'src/models/game.entity';
import Match from 'src/models/match.entity';
import Player from 'src/models/player.entity';
import { Repository } from 'typeorm';
import { PlayerService } from './player.service';

@Injectable()
export class MatchService {

    PLAYER1_WINNER = 'PLAYER1'
    PLAYER2_WINNER = 'PLAYER2'

    constructor(
        @Inject('MATCH_REPOSITORY') private matchRepository: Repository<Match>,
        private playerService: PlayerService,
        ) {}

    async create(match: CreateMatchInput): Promise<Match> {
        const games = match.games.map((game, i) => {
            const newGame = new Game()
            newGame.player1Points = game[0]
            newGame.player2Points = game[1]
            newGame.gameNumber = i + 1
            return newGame
        })
        const newMatch = new Match()
        newMatch.player1 = await this.playerService.findById(match.player1Id)
        newMatch.player2 = await this.playerService.findById(match.player2Id)
        
        newMatch.winner = this.validateGames(games)
        newMatch.games = games
        
        const savedMatch = await this.matchRepository.save(newMatch)
        await this.addWinnerPoints(newMatch.player1, newMatch.player2, newMatch.winner)

        return savedMatch;
    }

    validateGames(games: Game[]): string {
        const gamesWonCounter = [0, 0]
        for (const game of games) {
            this.validateGame(game)
            if(game.player1Points > game.player2Points) {
                gamesWonCounter[0] = gamesWonCounter[0]+1
            } else {
                gamesWonCounter[1] = gamesWonCounter[1]+1
            }
        }
        if (gamesWonCounter[0] === gamesWonCounter[1]) {
            throw new  UserInputError(`can not tie the match`)
        }
        if(games.length > 5) {
            throw new  UserInputError(`can not exceed 5 games`)
        }
        if(games.length < 3 ||  
            (games.length === 3 && Math.abs(gamesWonCounter[0]-gamesWonCounter[1]) !== 3) ||
            (games.length === 4 && Math.abs(gamesWonCounter[0]-gamesWonCounter[1]) !== 2) ||
            (games.length === 5 && Math.abs(gamesWonCounter[0]-gamesWonCounter[1]) !== 1)) {
            throw new  UserInputError(`invalid number of games to win`)
        }
        
        if (gamesWonCounter[0] > gamesWonCounter[1]) {
            return this.PLAYER1_WINNER
        } else {
            return this.PLAYER2_WINNER
        }
    }

    validateGame(game: Game) {
        if(game.player1Points < 0 || game.player2Points < 0) {
            throw new  UserInputError(`invalid game points in game ${game.gameNumber}`)
        }
        if(game.player1Points < 11 && game.player2Points < 11) {
            throw new  UserInputError(`one player must have at least 11 points in game ${game.gameNumber}`)
        }
        if(Math.abs(game.player1Points-game.player2Points)<2) {
            throw new  UserInputError(`points difference must be at least 2 points in game ${game.gameNumber}`)
        }
        if(Math.abs(game.player1Points-game.player2Points)>2 && (game.player2Points>11 || game.player1Points>11)) {
            throw new  UserInputError(`points difference must be 2 points in game ${game.gameNumber}`)
        }
        if(game.player1Points === game.player2Points) {
            throw new  UserInputError(`one player must win in game ${game.gameNumber}`)
        }
    }

    async addWinnerPoints(player1: Player, player2: Player, winner: string): Promise<void> {
        if(winner === this.PLAYER1_WINNER) {
            const points = player1.points + 1
            await this.playerService.updatePoints(player1, points)
        } else {
            const points = player2.points + 1
            await this.playerService.updatePoints(player2, points)
        }
    }

    async getAll(): Promise<Match[]> {
        return this.matchRepository.find({
            relations: {
                games: true,
                player2: true,
                player1: true
            },
        });
    }
}
