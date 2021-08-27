import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { GqlAuthGuard } from 'src/auth/guard/gql-guard';
import { jwtConstants } from 'src/auth/jwtConstants';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserResolver } from './user.resolver';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports:[
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      })
    ],
  providers:[UserResolver,UserService, JwtStrategy, GqlAuthGuard]
})
export class UserModule {}

