import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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