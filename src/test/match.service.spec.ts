import { Test, TestingModule } from '@nestjs/testing';
import Match from 'src/models/match.entity';
import { PlayerService } from 'src/services/player.service';

describe('MatchService', () => {

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PlayerService],
    }).compile();

  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
