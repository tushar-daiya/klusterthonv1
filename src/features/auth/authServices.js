import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    tagTypes: ["Client", "Invoice", "User"],
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getMonthAnalysis: builder.query({
      query: () => ({
        url: `transaction/analysis/monthly`,
        method: "GET",
      }),
      providesTags: ["Client", "Invoice","User"],
    }),
    getAnalysis: builder.query({
      query: () => ({
        url: `transaction/analysis`,
        method: "GET",
      }),
      providesTags: ["Client", "Invoice","User"],
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `user?_id=${Cookies.get("uid")}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getClients: builder.query({
      query: () => ({
        url: `client`,
        method: "GET",
      }),
      providesTags: ["Client","User"],
    }),
    getClient: builder.query({
      query: (id) => ({
        url: `client/?_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Client","User"],
    }),
    createClient: builder.mutation({
      query: (clientDetails) => ({
        url: `client`,
        method: "POST",
        body: clientDetails,
      }),
      invalidatesTags: ["Client","User"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client","User"],
    }),
    updateClient: builder.mutation({
      query: (values) => ({
        url: `client/${values.id}`,
        method: "PATCH",
        body: values.values,
      }),
      invalidatesTags: ["Client","User"],
    }),

    getInvoices: builder.query({
      query: () => ({
        url: `invoice`,
        method: "GET",
      }),
      providesTags: ["Invoice","User"],
    }),
    createInvoice: builder.mutation({
      query: (invoiceDetails) => ({
        url: `invoice`,
        method: "POST",
        body: invoiceDetails,
      }),
      invalidatesTags: ["Invoice","User"],
    }),

    getInvoice: builder.query({
      query: (id) => ({
        url: `invoice/?_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Invoice","User"],
    }),
    getInvoiceByEmail: builder.query({
      query: (email) => ({
        url: `invoice/?email=${email}`,
        method: "GET",
      }),
      providesTags: ["Invoice","User"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice","User"],
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
  useGetInvoiceByEmailQuery,
  useGetAnalysisQuery,
  useGetMonthAnalysisQuery,
} = authApi;
