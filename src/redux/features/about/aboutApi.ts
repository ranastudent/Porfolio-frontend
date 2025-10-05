import { apiSlice } from "../../api/apiSlice";

export const aboutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET About (Public)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAbout: builder.query<any, void>({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["About"],
    }),

    // CREATE About
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
        body: data,
      }),
      invalidatesTags: ["About"],
    }),

    // UPDATE About
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
        body: data,
      }),
      invalidatesTags: ["About"],
    }),

    // DELETE About
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
