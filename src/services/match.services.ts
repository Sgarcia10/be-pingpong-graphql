import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateMatchInput } from 'src/dtos/createMatch.dto';
import Game from 'src/models/game.entity';
import Match from 'src/models/match.entity';
import Player from 'src/models/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {

    constructor(
        @Inject('MATCH_REPOSITORY') private matchRepository: Repository<Match>,
        @Inject('PLAYER_REPOSITORY') private palyerRepository: Repository<Player>,
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
        newMatch.player1 = await this.palyerRepository.findOneBy({id: match.player1Id})
        newMatch.player2 = await this.palyerRepository.findOneBy({id: match.player2Id})
        newMatch.winner = 'PLAYER1'
        newMatch.games = games

        return this.matchRepository.save(newMatch);
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
