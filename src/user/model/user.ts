import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  username: string
  @Field({ nullable: true })
  name: string
  @Field({nullable:true})
  password:string
  @Field({ nullable: true })
  isAdmin:string
}