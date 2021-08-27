import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { TodoResolver } from './todos.resolver';
import { TodoSchema } from './todos.schema';
import { TodoService } from './todos.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [TodoResolver, TodoService]
})
export class TodoModule { }