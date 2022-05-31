import { UUIDExtension1653956432131 } from 'src/migrations/1653956432131-UUID_extension';
import { Player1653956468916 } from 'src/migrations/1653956468916-Player';
import { Match1653972483238 } from 'src/migrations/1653972483238-Match';
import { Game1653973858184 } from 'src/migrations/1653973858184-Game';
import Game from 'src/models/game.entity';
import Match from 'src/models/match.entity';
import Player from 'src/models/player.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const OrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.db_postgres_db_host || 'localhost',
  port: parseInt(process.env.db_postgres_db_port) || 5432,
  username: process.env.db_postgres_db_user || 'postgres',
  password: process.env.db_postgres_db_password || 'postgres',
  database: process.env.db_postgres_db_name || 'postgres',
  entities: [Player, Match, Game],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  migrations: [
    UUIDExtension1653956432131,
    Player1653956468916,
    Match1653972483238,
    Game1653973858184
  ]
};

export default new DataSource(OrmConfig);