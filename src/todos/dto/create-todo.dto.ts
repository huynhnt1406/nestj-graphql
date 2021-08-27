import { ObjectType,Field, ID } from "@nestjs/graphql"

@ObjectType()
export class CreateTodoDto {
    @Field({ nullable: true })
    readonly id?:string
    @Field({ nullable: true })
    readonly userId?:string
    @Field({ nullable: true })
    readonly name:string
    @Field({ nullable: true })
    readonly isCompleted?:boolean
}