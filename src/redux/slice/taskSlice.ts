import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Status = "ongoing" | "completed";

export interface Task {
	id: string;
	description: string;
	status: Status;
}

interface TaskState {
	tasks: Array<Task>;
	selectedTask: string | null;
}

const initialState: TaskState = {
	tasks: [
		{
			id: "task_1",
			status: "ongoing",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate ut. Orci sagittis eu volutpat odio facilisis mauris sit. Et netus et malesuada fames.",
		},
		{
			id: "task_2",
			status: "ongoing",
			description: "Pellentesque habitant morbi tristique senectus. Amet commodo nulla facilisi nullam vehicula ipsum a.",
		},
		{
			id: "task_3",
			status: "ongoing",
			description: "Cursus sit amet dictum sit amet justo donec.",
		},
		{
			id: "task_4",
			status: "ongoing",
			description:
				"Vitae et leo duis ut. Ut pharetra sit amet aliquam id diam. Sed felis eget velit aliquet sagittis. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.",
		},
		{
			id: "task_5",
			status: "ongoing",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Nibh nisl condimentum id venenatis. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Mauris ultrices eros in cursus turpis massa. Nam at lectus urna duis convallis convallis. Nascetur ridiculus mus mauris vitae ultricies leo integer. Arcu cursus vitae congue mauris rhoncus aenean vel. Massa enim nec dui nunc mattis enim ut tellus. Nam libero justo laoreet sit amet cursus sit amet dictum. Sed felis eget velit aliquet. Non nisi est sit amet facilisis magna etiam tempor orci. Nunc pulvinar sapien et ligula ullamcorper. Quam elementum pulvinar etiam non. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh tellus molestie nunc non blandit massa enim nec dui. Pulvinar mattis nunc sed blandit. Tristique et egestas quis ipsum. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus.",
		},
	],
	selectedTask: null,
};

export const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setSelectedTask: (state, action: PayloadAction<Partial<TaskState>>) => {
			const { selectedTask } = action.payload;
			state.selectedTask = selectedTask ?? state.selectedTask;
		},
		addTask: (state, action: PayloadAction<string>) => {
			const desc = action.payload;
			state.tasks = [
				{
					id: "task_" + (state.tasks.length + 1),
					description: desc,
					status: "ongoing",
				},
				...state.tasks,
			];
		},
		updateTask: (state, action: PayloadAction<{ id: string; status: Status }>) => {
			const { id, status } = action.payload;
			const index = state.tasks.findIndex((t) => t.id === id);
			if (index === -1) {
				state.tasks = [];
			}

			state.tasks[index] = {
				...state.tasks[index],
				status,
			};
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const index = state.tasks.findIndex((t) => t.id === id);
			if (index === -1) {
				state.tasks = [];
			}

			state.tasks = [...state.tasks.filter((e) => e.id !== id)];
		},
		setTasks: (state, action: PayloadAction<Partial<TaskState>>) => {
			const { tasks } = action.payload;
			state.tasks = tasks ?? state.tasks;
		},
		clearTasks: () => {
			return initialState;
		},
	},
});

export const { setSelectedTask, setTasks, addTask, updateTask, deleteTask, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks;
