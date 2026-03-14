import { baseApi } from "../api/baseApi";

export const notesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Notes"],
    }),

    addNote: builder.mutation({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Notes"],
    }),

    updateNote: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notes"],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;