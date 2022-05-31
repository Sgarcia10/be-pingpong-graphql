import Game from "src/models/game.entity";
import Match from "src/models/match.entity";
import Player from "src/models/player.entity";
import { DataSource } from "typeorm";
import dataSource from "./orm.config";

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        return dataSource.initialize();
      },
    },
    {
      provide: 'PLAYER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Player),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'MATCH_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Match),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'GAME_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),
      inject: ['DATA_SOURCE'],
    },
  ];