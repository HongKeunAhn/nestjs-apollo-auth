import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): any {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    return gqlExecutionContext.getContext().request;
  }
}