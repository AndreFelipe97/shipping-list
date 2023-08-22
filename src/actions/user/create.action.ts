import { hash } from 'bcryptjs';

export async function CreateUser(request: any) {
  const password = request.payload.password;

  if (password) {
    request.payload = {
      ...request.payload,
      password: await hash(password, 8),
    };
  }

  return request;
}
