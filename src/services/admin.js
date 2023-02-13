// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue;
}

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/v2/api/${process.env.REACT_APP_API_PATH}`,
    prepareHeaders: (headers) => {
      const token = getCookie('reactFinalToken');
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Coupons'],
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: (page = 1) => `/admin/coupons?page=${page}`,
      providesTags: ['Coupons'],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: '/admin/coupon',
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: ['Coupons'],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/coupon/${id}`,
        method: 'PUT',
        body: { data },
      }),
      invalidatesTags: ['Coupons'],
    }),
    deleteCoupon: builder.mutation({
      query: (deleteId) => ({
        url: `/admin/coupon/${deleteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupons'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCouponQuery, useCreateCouponMutation, useUpdateCouponMutation, useDeleteCouponMutation,
} = adminApi;
