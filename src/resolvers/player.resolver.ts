import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, } from "@nestjs/graphql";
import { AuthGuard } from "src/auth.guard";
import Player from "src/models/player.entity";
import { PlayerService } from "src/services/player.services";

@Resolver(of => Player)
@UseGuards(AuthGuard)
export class PlayerResolver {
    constructor(
        private readonly playerService: PlayerService,
    ) {}

    @Query(() => [Player])
    async players() {
        return this.playerService.getAll()
    }

    @Mutation(() => Player)
    async createPlayer(@Args('username', { type: () => String }) username: string) {
        return this.playerService.create({username})
    }
}