import { apiSlice } from "../../api/apiSlice";

export const aboutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET About (Public)
    getAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["About"],
    }),

    // CREATE About (Admin Only)
    createAbout: builder.mutation({
      query: (data: {
        name: string;
        bio: string;
        email: string;
        contact?: string | null;
        skills?: string[];
        image?: string | null;
      }) => ({
        url: "/about",
        method: "POST",
        body: data, // send JSON directly
      }),
      invalidatesTags: ["About"],
    }),

    // UPDATE About (Admin Only)
    updateAbout: builder.mutation({
      query: (data: {
        name?: string;
        bio?: string;
        email?: string;
        contact?: string | null;
        skills?: string[];
        image?: string | null;
      }) => ({
        url: "/about",
        method: "PATCH",
        body: data, // JSON payload
      }),
      invalidatesTags: ["About"],
    }),

    // DELETE About (Admin Only)
    deleteAbout: builder.mutation({
      query: () => ({
        url: "/about",
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApi;
