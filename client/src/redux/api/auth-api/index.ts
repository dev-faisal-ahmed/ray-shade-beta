import {
  LoginRequestType,
  RegisterRequestType,
  UpdateProfileRequestType,
} from './types';
import { BaseApi } from '..';
import { ServerResponseType, UserType } from '@/lib/types/data-types';

const AUTH_URL = 'auth';

export const AuthApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ServerResponseType<null>, RegisterRequestType>({
      query: (payload) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: payload,
      }),
    }),

    login: builder.mutation<
      ServerResponseType<{ token: string }>,
      LoginRequestType
    >({
      query: (payload) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'all-products',
        'daily-orders',
        'monthly-orders',
        'orders',
        'product-by-id',
        'weekly-orders',
        'yearly-orders',
        'user-info',
      ],
    }),

    getMyInfo: builder.query<ServerResponseType<UserType>, string>({
      query: (id) => `${AUTH_URL}/mine/${id}`,
      providesTags: ['user-info'],
    }),

    updateMyInfo: builder.mutation<
      ServerResponseType<{ token: string }>,
      UpdateProfileRequestType
    >({
      query: ({ id, payload }) => ({
        url: `${AUTH_URL}/update/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['user-info'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMyInfoQuery,
  useUpdateMyInfoMutation,
} = AuthApi;
