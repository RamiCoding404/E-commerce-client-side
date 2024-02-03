import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rami-fullstack-reactjs-strapi-app.onrender.com/api",
  }),
  endpoints: (build) => ({
    //Get
    getDashboardProducts: build.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/products?populate=category,thumbnail&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products", id })),
              "Products",
            ]
          : ["Products"],
    }),
    //delete
    deleteDashboardProducts: build.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),
    //update
    updateDashboardProducts: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Products"],
    }),
    //create
    createDashboardProducts: build.mutation({
      query(body) {
        return {
          url: `/products`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },

      invalidatesTags: ["Products"],
    }),
    //get Category
    getCategories: build.query({
      query: () => ({
        url: `/categories`,
      }),
      providesTags: ["Categories"],
    }),
  }),
});
export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useCreateDashboardProductsMutation,
  useGetCategoriesQuery,
} = productsApiSlice;
