import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://klusterthon-project67.onrender.com/api/v1/",
    tagTypes: ["Client", "Invoice"],
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `user?_id=${Cookies.get("uid")}`,
        method: "GET",
      }),
    }),
    getClients: builder.query({
      query: () => ({
        url: `client`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    getClient: builder.query({
      query: (id) => ({
        url: `client/?_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    createClient: builder.mutation({
      query: (clientDetails) => ({
        url: `client`,
        method: "POST",
        body: clientDetails,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation({
      query: (values) => ({
        url: `client/${values.id}`,
        method: "PATCH",
        body: values.values,
      }),
      invalidatesTags: ["Client"],
    }),

    getInvoices: builder.query({
      query: () => ({
        url: `invoice`,
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),
    createInvoice: builder.mutation({
      query: (invoiceDetails) => ({
        url: `invoice`,
        method: "POST",
        body: invoiceDetails,
      }),
      invalidatesTags: ["Invoice"],
    }),

    getInvoice: builder.query({
      query: (id) => ({
        url: `invoice/?_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetClientQuery,
  useGetInvoiceQuery,
  useUpdateClientMutation,
} = authApi;
