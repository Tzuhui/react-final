// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/v2/api/${process.env.REACT_APP_API_PATH}`,
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (param) => `/products?page=${param.page}&category=${param.category}`,
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addCart: builder.mutation({
      query: (data) => ({
        url: '/cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    postCoupon: builder.mutation({
      query: (data) => ({
        url: '/coupon',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    postOrder: builder.mutation({
      query: (data) => ({
        url: '/order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    postPaidOrder: builder.mutation({
      query: (id) => ({
        url: `/pay/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  usePostCouponMutation,
  usePostOrderMutation,
  usePostPaidOrderMutation,
} = productsApi;
