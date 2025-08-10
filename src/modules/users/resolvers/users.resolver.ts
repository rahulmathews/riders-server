import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDto])
  users(): UserDto[] {
    const users = this.usersService.findAll();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Query(() => UserDto, { nullable: true })
  user(@Args('id', { type: () => ID }) id: string): UserDto | null {
    const user = this.usersService.findOne(id);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
