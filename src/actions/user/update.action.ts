import { ActionContext, ActionRequest } from 'adminjs';
import { compare, hash } from 'bcryptjs';

export async function UpdateUser(
  request: ActionRequest,
  context: ActionContext,
) {
  const password = request.payload?.password;

  const comparePassword = await compare(
    password,
    context.record?.params.password,
  );

  if (password && !comparePassword) {
    request.payload = {
      ...request.payload,
      password: await hash(password, 8),
    };
  } else {
    request.payload = {
      ...request.payload,
      password: context.record?.params.password,
    };
  }

  return request;
}
