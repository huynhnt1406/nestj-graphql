import {Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateTodo{
    @Field({nullable:true})
    readonly name:string
    @Field({nullable:true})
    readonly isCompleted:boolean = false
}