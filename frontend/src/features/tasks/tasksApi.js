import { baseApi } from "../api/baseApi";

export const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => {},
            providesTags: ["Tasks"],
        }),

        addTasks: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),

        updateTask: builder.mutation({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Tasks"],
        }),

        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                 method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    })
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
