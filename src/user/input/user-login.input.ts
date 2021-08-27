import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class loginUser {
    @Field({ nullable: true })
    readonly username?: string
    @Field({ nullable: true })
    readonly password?: string
    @Field({ nullable: true })
    readonly isAdmin?:boolean
}