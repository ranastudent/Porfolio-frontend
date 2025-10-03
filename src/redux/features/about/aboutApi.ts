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
      query: (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.image) formData.append("image", data.image);

        return {
          url: "/about",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["About"],
    }),

    // UPDATE About (Admin Only)
    updateAbout: builder.mutation({
      query: (data) => ({
        url: "/about",
        method: "PATCH",
        body: data,
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
