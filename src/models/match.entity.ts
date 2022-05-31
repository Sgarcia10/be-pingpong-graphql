import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Game from "./game.entity";

@ObjectType()
@Entity()
export default class Match {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
        name: 'player1_id',
        nullable: false
    })
    player1Id: string;

    @Field()
    @Column({
        name: 'player2_id',
        nullable: false
    })
    player2Id: string;

    @Field()
    @Column({
        nullable: false
    })
    winner: string;

    @OneToMany(() => Game, (game) => game.match, {cascade: true})
    games: Game[]
}