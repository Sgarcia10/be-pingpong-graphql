import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Game from "./game.entity";
import Player from "./player.entity";

@ObjectType()
@Entity()
export default class Match {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => Player)
    @ManyToOne(() => Player)
    @JoinColumn({
        name: 'player1_id',
    })
    player1: Player;

    @Field(type => Player)
    @ManyToOne(() => Player)
    @JoinColumn({
        name: 'player2_id',
    })
    player2: Player;

    @Field()
    @Column({
        nullable: false
    })
    winner: string;

    @Field(type => [Game])
    @OneToMany(() => Game, (game) => game.match, {cascade: true})
    games: Game[]

    @CreateDateColumn({ 
        name: 'created_at',
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    })
    createdAt: Date;

    @UpdateDateColumn({ 
        name: 'updated_at',
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    updatedAt: Date;
}