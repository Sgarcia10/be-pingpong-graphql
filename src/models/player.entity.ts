import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Player {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Field()
    @Column({
        nullable: false
    })
    points: number;
}