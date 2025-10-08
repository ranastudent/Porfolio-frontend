import { apiSlice } from "../../api/apiSlice";

export const resumeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get resume for logged-in user
    getResume: builder.query({
      query: () => `/resume`,
      providesTags: ["Resume"],
    }),

    // ✅ Save (create or upsert) resume
    saveResume: builder.mutation({
      query: (data) => ({
        url: `/resume`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resume"],
    }),

    // ✅ Update resume partially
    updateResume: builder.mutation({
      query: (data) => ({
        url: `/resume`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Resume"],
    }),

    // ✅ Delete resume
    deleteResume: builder.mutation({
      query: () => ({
        url: `/resume`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resume"],
    }),

    // ✅ Admin-only: Get resume by email
    getResumeByEmail: builder.query({
      query: (userEmail) => `/resume/${userEmail}`,
      providesTags: ["Resume"],
    }),
  }),
});

export const {
  useGetResumeQuery,
  useSaveResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGetResumeByEmailQuery,
} = resumeApi;
