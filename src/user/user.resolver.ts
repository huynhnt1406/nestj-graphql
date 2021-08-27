import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserToken } from "./model/user-token.dto";
import { loginUser } from "./input/user-login.input";
import { RegisterUser } from "./input/user-register.input";
import { UserService } from "./user.service";
import { User } from "./model/user";
import { UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GqlAuthGuard } from "src/auth/guard/gql-guard";
import { CurrentUser } from "src/auth/decorators/ctx-user.decorator";
@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel('User') private userModel: Model<User>,
    ) { }
    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    async auth(@CurrentUser() user: User) {
        return user
    }
    @Mutation(() => User)
    async register(@Args('input') input: RegisterUser) {
        return this.userService.register(input)
    }
    @Mutation(() => UserToken)
    async login(@Args('input') input: loginUser) {
        return await this.userService.login(input)
    }
}
