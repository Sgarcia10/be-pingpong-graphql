import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, } from "@nestjs/graphql";
import { CreateMatchInput } from "src/dtos/createMatch.dto";
import { AuthGuard } from "src/guards/auth.guard";
import Match from "src/models/match.entity";
import { MatchService } from "src/services/match.service";

@Resolver(of => Match)
@UseGuards(AuthGuard)
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
        return this.matchService.create(matchData)
    }
}