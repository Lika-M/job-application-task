import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuthData, resetAuth } from './authSlice';

const apiUrl = 'http://localhost:3000/';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const customBaseQuery = async (args, api) => {
  try {
    const result = await baseQuery(args, api);

    if (result.error) {
      throw new Error(result.error.data || 'API request failed');
    }
    return result;
  } catch (error) {
    console.error('Base query error:', error);
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    
    // Employee Login
    loginEmployee: builder.mutation({
      query: (credentials) => ({
        url: '/users',
        method: 'GET',
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const user = data.find((user) => 
            (user.email === credentials.email && user.password === credentials.password));

          if (user) {
            dispatch(setAuthData({ userInfo: user }));
          } else {
            dispatch(setAuthData({ userInfo: null }));
          }
        } catch (error) {
          console.error('Employee login failed:', error);
        }
      },
    }),

    // Company Login
    loginCompany: builder.mutation({
      query: (credentials) => ({
        url: '/companies',
        method: 'GET',
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const company = data.find((company) => 
            (company.email === credentials.email && company.password === credentials.password));
          
          if (company) {
            dispatch(setAuthData({ userInfo: company }));
          } else {
            dispatch(setAuthData({ userInfo: null }));
          }
        } catch (error) {
          console.error('Company login failed:', error);
        }
      },
    }),

    // Employee Registration
    registerEmployee: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),

    // Company Registration
    registerCompany: builder.mutation({
      query: (userData) => ({
        url: '/companies',
        method: 'POST',
        body: userData,
      }),
    }),

    // Logout
    logout: builder.mutation({
      onQueryStarted: async (_, { dispatch }) => {
        try {
          dispatch(resetAuth());
        } catch (error) {
          console.error('Logout process failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginEmployeeMutation,
  useLoginCompanyMutation,
  useRegisterEmployeeMutation,
  useRegisterCompanyMutation,
  useLogoutMutation,
} = authApi;

export default authApi.reducer;
