import { Model } from 'mongoose';
import { Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt';
import { RegisterUser } from './input/user-register.input';
import { loginUser } from './input/user-login.input';
import { UserToken } from './model/user-token.dto';
import { User } from './model/user';
import { Request, Response } from 'express';
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private readonly jwtService:JwtService
    ) { }

    async register(createUserDto: RegisterUser): Promise<User> {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10)
        const newUser = new this.userModel({
            name: createUserDto.name,
            username: createUserDto.username,
            password: hashPassword
        });
        return await newUser.save();
    }
    async login({username,password}:loginUser):Promise<UserToken>{
        const user = await this.userModel.findOne({username})
        if(!user){
            throw new NotFoundException()
        }
        const isPass = await bcrypt.compare(password,user.password)
        if(!isPass){
            throw new UnauthorizedException()
        }
        const result = await user.save()
        const token = await this.jwtService.sign({id:result.id,username:result.username,isAdmin:result.isAdmin})
        return {token,user}
    }
}