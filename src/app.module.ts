import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { databaseProviders } from './config/database.provider';
import { MatchResolver } from './resolvers/match.resolver';
import { PlayerResolver } from './resolvers/player.resolver';
import { MatchService } from './services/match.services';
import { PlayerService } from './services/player.services';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      csrfPrevention: true
    }),
  ],
  providers: [
    ...databaseProviders,
    PlayerService,
    PlayerResolver,
    MatchResolver,
    MatchService
  ],
  exports: [
    PlayerService
  ]
})
export class AppModule {}
