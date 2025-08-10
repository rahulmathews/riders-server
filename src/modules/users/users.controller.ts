import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from '@interfaces/user.interface';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() userData: Omit<User, 'id'>): User {
    return this.usersService.create(userData);
  }
}
