import { Injectable } from "@nestjs/common";
import { Args } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/model/user";
import { UserSchema } from "src/user/user.schema";
import { UpdateTodo } from "./input/todo-update.input";
import { TodoInput } from "./input/todo.input";
import { Todo } from "./interfaces/todo.interface";

@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private todoModel: Model<Todo>,
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    async getAllTodos(): Promise<any> {
        return this.todoModel.find().exec()
    }
    async getByUser(userId:string): Promise<any> {
        return this.todoModel.find({userId}).exec()
    }

    async create(id:string, createTodoDto: TodoInput): Promise<Todo> {
        const newTodo = await this.todoModel.create({
            name: createTodoDto.name,
            userId:id
        })
        console.log(newTodo)
        return newTodo
    }
    async delete( id: string) {
        return await this.todoModel.findByIdAndRemove(id)
    }
    async update(uid: string, updateTodoDto: UpdateTodo): Promise<any> {
        return this.todoModel.findByIdAndUpdate( updateTodoDto, { new: true })
    }
}