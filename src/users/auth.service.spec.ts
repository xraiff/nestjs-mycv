import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
    // Create a fake copy of the users service.  We only faked the methods we need
    const fakeUsersService: Partial<UsersService> = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
    };

    // If anyone asks for the UsersService, give them the fakeUsersService
    const module = await Test.createTestingModule({
        providers: [AuthService, {
            provide: UsersService,
            useValue: fakeUsersService
        }]
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
});

