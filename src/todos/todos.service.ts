import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
        return newTodo
    }
    async delete( userId:string,id: string) {
        try {
            const todoDelete = await this.todoModel.findById(id)
            if(userId === todoDelete.userId){
                return await this.todoModel.findByIdAndDelete(id)
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
    async update(userId:string,id: string, updateTodoDto: UpdateTodo): Promise<any> {
        try {
            const todoDelete = await this.todoModel.findById(id)
            if(userId === todoDelete.userId){
                return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true })
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}