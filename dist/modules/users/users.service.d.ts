import { User } from '@interfaces/user.interface';
export declare class UsersService {
    private users;
    findAll(): User[];
    findOne(id: string): User | undefined;
    create(userData: Omit<User, 'id'>): User;
}
