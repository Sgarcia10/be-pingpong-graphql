import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { validateJwt } from './utils/jwt.util';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {req} = context.getArgs()[2];
        const authHeader = req.headers.authorization;
        let token = '';

        if (authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7, authHeader.length);
        } else {
            throw new AuthenticationError('invalid token')
        }
        
        const isValid = await validateJwt(token)
        if(!isValid) {
            throw new AuthenticationError('you must be logged in')
        }
        
        return true;
    }
}