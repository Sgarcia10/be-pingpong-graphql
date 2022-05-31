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
        @Inject('MATCH_REPOSITORY') private matchRepository: Repository<Match>
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
        newMatch.player1Id = match.player1Id
        newMatch.player2Id = match.player2Id
        newMatch.winner = 'PLAYER1'
        newMatch.games = games

        return this.matchRepository.save(newMatch);
    }

    async getAll(): Promise<Match[]> {
        return this.matchRepository.find();
    }
}
