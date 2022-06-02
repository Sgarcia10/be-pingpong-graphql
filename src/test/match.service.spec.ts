import { Test, TestingModule } from '@nestjs/testing';
import { UserInputError } from 'apollo-server-express';
import Game from 'src/models/game.entity';
import { MatchService } from '../services/match.service';
import { PlayerService } from '../services/player.service';

describe('MatchService', () => {
  let matchService: MatchService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        MatchService,
        {
          provide: 'PLAYER_REPOSITORY',
          useFactory: () => jest.fn(),
        },
        {
          provide: 'MATCH_REPOSITORY',
          useFactory: () => jest.fn(),
        }
      ],
    }).compile();

    matchService = app.get<MatchService>(MatchService);

  });

  describe('game', () => {
    it('should return invalid game points (no negative)', () => {
      const game1 = new Game()
      game1.player1Points = -2;
      game1.player2Points = 2;
      game1.gameNumber = 1
      const games = [
        game1
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('one player must have at least 11 points', () => {
      const game1 = new Game()
      game1.player1Points = 2;
      game1.player2Points = 2;
      game1.gameNumber = 1
      const games = [
        game1
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('points difference must be at least 2 points', () => {
      const game1 = new Game()
      game1.player1Points = 11;
      game1.player2Points = 10;
      game1.gameNumber = 1
      const games = [
        game1
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('points difference must be 2 points', () => {
      const game1 = new Game()
      game1.player1Points = 11;
      game1.player2Points = 14;
      game1.gameNumber = 1
      const games = [
        game1
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('one player must win in game', () => {
      const game1 = new Game()
      game1.player1Points = 11;
      game1.player2Points = 11;
      game1.gameNumber = 1
      const games = [
        game1
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });
  });

  describe('match', () => {
    it('can not tie the match', () => {
      const game1 = new Game()
      game1.player1Points = 1;
      game1.player2Points = 11;

      const game2 = new Game()
      game2.player1Points = 11;
      game2.player2Points = 2;
      const games = [
        game1,
        game2
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('invalid number of games to win', () => {
      const game1 = new Game()
      game1.player1Points = 1;
      game1.player2Points = 11;

      const game2 = new Game()
      game2.player1Points = 1;
      game2.player2Points = 11;
      const games = [
        game1,
        game2
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('invalid number of games to win', () => {
      const game1 = new Game()
      game1.player1Points = 1;
      game1.player2Points = 11;

      const game2 = new Game()
      game2.player1Points = 1;
      game2.player2Points = 11;

      const game3 = new Game()
      game3.player1Points = 11;
      game3.player2Points = 1;

      const games = [
        game1,
        game2,
        game3
      ]
      expect(() => matchService.validateGames(games)).toThrowError(UserInputError)
    });

    it('valid win', () => {
      const game1 = new Game()
      game1.player1Points = 1;
      game1.player2Points = 11;

      const game2 = new Game()
      game2.player1Points = 1;
      game2.player2Points = 11;

      const game3 = new Game()
      game3.player1Points = 9;
      game3.player2Points = 11;

      const games = [
        game1,
        game2,
        game3
      ]
      expect(matchService.validateGames(games)).toBe('PLAYER2')
    });


  });
});
