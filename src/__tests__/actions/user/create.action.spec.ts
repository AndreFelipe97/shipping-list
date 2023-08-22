import { CreateUser } from '../../../actions/user/create.action';

jest.mock('bcryptjs', () => ({
  hash: () => 'any-password-hashed',
}));

describe('Create user', () => {
  it('should create user', async () => {
    const newUser = {
      payload: {
        name: 'any-name',
        email: 'any-email',
        password: 'any-password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const createUser = await CreateUser(newUser);

    expect(createUser.payload).toEqual({
      ...newUser.payload,
      password: 'any-password-hashed',
    });
  });
});
