import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@clerk/backend';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;

  if (!user) {
    throw new Error('User not found in request');
  }

  return user;
});
