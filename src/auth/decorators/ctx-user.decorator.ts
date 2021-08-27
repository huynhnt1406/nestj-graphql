import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user;
  },
);
//using this ctxUser to make decorator, help verify the user who do any action like get, post , put, delete

//@ctxUser() user:CreateUserDto

//when you console.log(user) => show user detail information userId, name, username, password, isAdmi