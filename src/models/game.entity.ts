import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Match from "./match.entity";

@ObjectType()
@Entity()
export default class Game {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @ManyToOne(() => Match, (match) => match.games)
    match: Match;

    @Field()
    @Column({
        name: 'player1_points',
        nullable: false
    })
    player1Points: number;

    @Field()
    @Column({
        name: 'player2_points',
        nullable: false
    })
    player2Points: number;

    @Field()
    @Column({
        name: 'game_number',
        nullable: false
    })
    gameNumber: number;
}