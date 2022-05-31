import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import Player from 'src/models/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

    constructor(
        @Inject('PLAYER_REPOSITORY') private playerRepository: Repository<Player>
        ) {}

    async create({username = ''}): Promise<Player> {
        const player = await this.playerRepository.findOneBy({ username })
        if(!!player) {
            throw new UserInputError('username already exists');
        }
        return this.playerRepository.save({username});
    }

    async getAll(): Promise<Player[]> {
        return this.playerRepository.find();
    }
}
