import { ObjectType,Field, ID } from "@nestjs/graphql"
import { User } from "./user"

@ObjectType()
export class UserToken{
    @Field()
    token:string
    @Field()
    user:User
}