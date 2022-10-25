import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../slice";

export const todosApi = createApi({
	reducerPath: "todosApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/api" }),
	tagTypes: ["Tasks"],
	endpoints: (builder) => ({
		getTasks: builder.query<Task[], void>({
			query: () => ({
				url: `todos`,
				method: "GET",
			}),
			transformResponse: (data: Task[]) => {
				return data;
			},
			providesTags: ["Tasks"],
		}),
		addTask: builder.mutation<{ id: string; }, string>({
			query: (body) => ({
				url: `todos`,
				method: "POST",
				body: {
					description: body,
				},
			}),
			invalidatesTags: ["Tasks"],
		}),
		updateTask: builder.mutation<unknown, string>({
			query: (id) => ({
				url: `todos/${id}/completed`,
				method: "PUT",
			}),
			invalidatesTags: ["Tasks"],
		}),
		deleteTask: builder.mutation<unknown, string>({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tasks"],
		}),
	}),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = todosApi;
