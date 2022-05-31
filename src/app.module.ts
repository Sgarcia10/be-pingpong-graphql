import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './config/database.provider';
import Player from './models/player.entity';
import { PlayerResolver } from './resolvers/player.resolver';
import { PlayerService } from './services/player.services';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [
    ...databaseProviders,
    PlayerService,
    PlayerResolver
  ],
  exports: [
    PlayerService
  ]
})
export class AppModule {}
