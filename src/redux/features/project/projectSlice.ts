/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/feature/project/projectSlice.ts
import { apiSlice } from "../../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    // Get single project by ID
    getProjectById: builder.query({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),

    // Create project (with file upload)
    createProject: builder.mutation({
      query: (data: any) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    // Update project (with file upload)
    updateProject: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Projects", id }],
    }),

    // Delete project
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

// Export hooks
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
