import {Field, InputType } from "@nestjs/graphql"

@InputType()
export class RegisterUser{
    @Field({ nullable: true })
    readonly name?:string
    @Field({ nullable: true })
    readonly username?:string
    @Field({ nullable: true })
    readonly password?:string
    @Field({ nullable: true })
    readonly isAdmin?:boolean
}