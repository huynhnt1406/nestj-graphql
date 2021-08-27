import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context:ExecutionContext){
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}

//this is the way we can extract out ctx information  in a graphql

// moi lan request gui deu phai qua cai nay