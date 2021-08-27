import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "../jwtConstants";


export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    
    constructor(private readonly userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:jwtConstants.secret
        })
    }
    async validate(payload: any) {
        console.log('jwtStrategy',payload)
        return {id: payload.id, username: payload.username, isAdmin:payload.isAdmin };
    }
}