import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './models/user';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/getUser.args';
import { GetUsersArgs } from './dto/args/getUsers.args';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { DeleteUserInput } from './dto/input/deleteUser.input';

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'user', nullable: 'items' })
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
