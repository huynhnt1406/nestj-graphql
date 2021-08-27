import {Field, InputType } from "@nestjs/graphql"

@InputType()
export class TodoInput{
    @Field()
    readonly name:string
    @Field()
    readonly isCompleted:boolean = false
}