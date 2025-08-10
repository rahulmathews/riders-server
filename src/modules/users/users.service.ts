import { Injectable } from '@nestjs/common';

import { getCurrentTimestamp } from '@common/utils/date.utils';
import { User } from '@interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(userData: Omit<User, 'id'>): User {
    const now = getCurrentTimestamp();
    const user: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    return user;
  }
}
