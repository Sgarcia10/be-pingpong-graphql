import { Args, Mutation, Query, Resolver, } from "@nestjs/graphql";
import { CreateMatchInput } from "src/dtos/createMatch.dto";
import Match from "src/models/match.entity";
import Player from "src/models/player.entity";
import { MatchService } from "src/services/match.services";
import { PlayerService } from "src/services/player.services";

@Resolver(of => Match)
export class MatchResolver {
    constructor(
        private readonly matchService: MatchService,
    ) {}

    @Query(() => [Match])
    async matches() {
        return this.matchService.getAll()
    }

    @Mutation(() => Match)
    async createMatch(@Args('matchData') matchData: CreateMatchInput) {
        console.log({matchData});
        
        return this.matchService.create(matchData)
    }
}