import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

// Define a type that is a class constructor
interface ClassContructor {
    new (...args: any[]): {}
}

// Create a simple decorator that will use the SerializeInterceptor
export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

// implements means that this class is implementing the NestInterceptor interface
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        // Run something before a request is handled by the request handler

        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out

                return plainToClass(this.dto, data, {excludeExtraneousValues: true});

            })
        )
    }

}