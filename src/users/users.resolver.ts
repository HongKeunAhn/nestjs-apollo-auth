import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './models';
import { UsersService } from './users.service';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { CreateUserInput, UpdateUserInput, DeleteUserInput } from './dto/input';
import { GqlAuthGuard } from './../auth/guard';
import { CurrentUser } from 'src/auth/currentUser.decorator';

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: User, @Args() getUserArgs: GetUserArgs): User {
    console.log(user);
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserData);
  }
}
