import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        // ExecutionContext can refer to http, rpc, websocket, etc.
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)