import { User } from '@interfaces/user.interface';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): User[];
    findOne(id: string): User | undefined;
    create(userData: Omit<User, 'id'>): User;
}
