import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateMatchInput {
  @Field()
  player1Id: string;

  @Field()
  player2Id: string;

  @Field(type => [[Int]])
  games: number[][];
}