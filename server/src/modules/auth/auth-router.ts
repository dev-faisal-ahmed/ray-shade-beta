import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation-handler';
import { AuthValidation } from './auth-validation';
import { AuthController } from './auth-controller';

export const AuthRouter = Router();

AuthRouter.post(
  '/register',
  ValidationHandler(AuthValidation.AuthRegisterSchema),
  AuthController.Register
);

AuthRouter.post(
  '/login',
  ValidationHandler(AuthValidation.AuthLoginSchema),
  AuthController.Login
);

AuthRouter.get('/mine/:myId', AuthController.GetMyInfo);

AuthRouter.patch(
  '/update/:myId',
  ValidationHandler(AuthValidation.UpdateUserSchema),
  AuthController.UpdateUser
);
