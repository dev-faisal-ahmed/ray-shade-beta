import { SendSuccessResponse } from '../../utils/response-helper';
import { TryCatch } from '../../utils/try-catch';
import { AuthServices } from './services';

const Register = TryCatch(async (req, res) => {
  const newUser = await AuthServices.Register(req.body);

  return SendSuccessResponse(res, {
    data: newUser,
    message: 'User Created',
    status: 200,
  });
});

const Login = TryCatch(async (req, res) => {
  const token = await AuthServices.Login(req.body);

  res.cookie('auth', token);
  return SendSuccessResponse(res, {
    data: { token },
    message: 'User Successfully Logged in',
    status: 200,
  });
});

const UpdateUser = TryCatch(async (req, res) => {
  const token = await AuthServices.UpdateUser(req.params.myId, req.body);

  return SendSuccessResponse(res, {
    data: { token },
    message: 'User updated successfully',
    status: 200,
  });
});

const GetMyInfo = TryCatch(async (req, res) => {
  const user = await AuthServices.GetMyInfo(req.params.myId);

  return SendSuccessResponse(res, {
    data: user,
    message: 'User info retrieved successfully',
    status: 200,
  });
});

export const AuthController = { Register, Login, UpdateUser, GetMyInfo };
