import { UserModel } from '../../models/user.model';
import { sendSuccess, sendError } from '../../utils/response.helper';
import { SuccessMessages, ErrorMessages } from '../../common/messages';

export const login = async ({ body, error, request, authJwt, set }: any) => {
  const { email, password } = body;
  const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';

  const user = await UserModel.findByEmail(email);

  if (!user) {
    return sendError({ set }, ErrorMessages.NOT_FOUND, {}, 404);
  }

  const isPasswordValid = await Bun.password.verify(password, user.password);

  if (!isPasswordValid) {
    await UserModel.incrementLoginAttempts(user.id);
    return sendError({ set }, ErrorMessages.INVALID_CREDENTIALS, {}, 401);
  }

  await UserModel.updateLastLogin(user.id, ipAddress);

  // Use the 'authJwt' plugin passed from the route
  const token = await authJwt.sign({
    userId: user.id,
    email: user.email,
    role: 'admin'
  });

  // Attach to response header
  set.headers['Authorization'] = `Bearer ${token}`;

  return sendSuccess({ set }, SuccessMessages.LOGIN_SUCCESSFUL, {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
};