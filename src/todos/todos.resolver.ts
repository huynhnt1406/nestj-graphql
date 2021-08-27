import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CurrentUser} from "src/auth/decorators/ctx-user.decorator";
import { GqlAuthGuard } from "src/auth/guard/gql-guard";
import { User } from "src/user/model/user";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodo } from "./input/todo-update.input";
import { TodoInput } from "./input/todo.input";
import { TodoService } from "./todos.service";
import { Todo } from "./interfaces/todo.interface";
@Resolver()
@UseGuards(GqlAuthGuard)
export class TodoResolver {
    constructor(
        private todoService: TodoService
    ) { }
    @Query(() => [CreateTodoDto])
    async getAllTodos(@CurrentUser() user:any){
        try {
            if(user.isAdmin === true){
                return this.todoService.getAllTodos()
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
    @Query(() => [CreateTodoDto])
    async getByUser(@CurrentUser() user:any ,@Args('userId') userId:string = user.id) {
        return this.todoService.getByUser(userId)
    }
    @Mutation(() => CreateTodoDto)
    async create( @CurrentUser() user:any,@Args('input') input: TodoInput) {
        return this.todoService.create(user.id,input)
    }
    @Mutation(() => CreateTodoDto, { nullable: true })
    async delete(@CurrentUser() user:any,@Args('id') id: string) {
        return this.todoService.delete(user.id,id)
    }
    @Mutation(() => CreateTodoDto)
    async update(@CurrentUser() user:any,@Args('id') id: string, @Args('input') input: UpdateTodo) {
        return this.todoService.update(user.id,id, input)
    }
}
