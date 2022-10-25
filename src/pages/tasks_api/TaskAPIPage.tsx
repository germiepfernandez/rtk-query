import React, { useState } from "react";
import { ActionIcon, Button, createStyles, Group, List, LoadingOverlay, Text, TextInput, Title } from "@mantine/core";
import { CheckCircleOutlined, CheckSquareOutlined, CloseSquareOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../redux/service";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
	container: {
		position: "relative",
		display: "flex",
		gap: "10px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100%",
	},
	inputContainer: {
		width: "100%",
		marginTop: "20px",
	},
	fullWidth: {
		flex: 1,
	},
	warningIcon: {
		color: theme.colors.orange[5],
		fontSize: "20px",
	},
	completedIcon: {
		color: theme.colors.green[5],
		fontSize: "20px",
	},
	approveIcon: {
		color: theme.colors.green[5],
		fontSize: "30px",
	},
	deleteIcon: {
		color: theme.colors.red[5],
		fontSize: "30px",
	},
}));

const useListStyles = createStyles((theme) => ({
	root: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		gap: "20px",
		marginTop: "40px",
		flex: 1,
	},
	item: {
		border: "1px solid " + theme.colors.gray[3],
		borderRadius: "5px",
		padding: "8px 15px",
	},
	itemWrapper: {
		display: "flex !important",
		justifyContent: "space-between !important",
		flexDirection: "row",
		alignItems: "center !important",
	},
	itemIcon: {
		marginTop: "5px",
	},
}));

export const TaskAPIPage = () => {
	const { classes } = useStyles();
	const { classes: listClasses } = useListStyles();

	const [task, setTask] = useState("");
	const { data: tasks, isFetching } = useGetTasksQuery();
	const [addTask, { isLoading: isAddTaskLoading }] = useAddTaskMutation();
	const [updateTask, { isLoading: isUpdateTaskLoading }] = useUpdateTaskMutation();
	const [deleteTask, { isLoading: isDeleteTaskLoading }] = useDeleteTaskMutation();

	const isLoading = isFetching || isAddTaskLoading || isUpdateTaskLoading || isDeleteTaskLoading;
	const handleCompletedClick = async (id: string, status: string) => {
        if(status === 'completed') {
            showNotification({
                title: `Warning`,
                color: "orange",
                // icon: <CheckCircleFilled />,
                message: `Task is already completed.`,
            });
            return;
        }

		await updateTask(id).unwrap();
		showNotification({
			title: `${id.toUpperCase()} completed`,
			color: "green",
			// icon: <CheckCircleFilled />,
			message: `Successfully updated task's status to Completed.`,
		});
	};

	const handleDeleteClick = async (id: string) => {
		await deleteTask(id).unwrap();
		showNotification({
			title: `${id} deleted`,
			message: `Successfully deleted task.`,
		});
	};

	const handleSubmit = async () => {
		const { id } = await addTask(task).unwrap();
		showNotification({
			title: `${id} added`,
			message: `Successfully added task.`,
		});
	};

	return (
		<div className={classes.container}>
			<header>
				<Title order={2}>Todo List using RTK Query</Title>
			</header>
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			<Group spacing="lg" className={classes.inputContainer}>
				<TextInput placeholder="Add new Tasks" className={classes.fullWidth} value={task} onChange={(e) => setTask(e.target.value)} />
				<Button onClick={handleSubmit}>Submt</Button>
			</Group>
			<List classNames={listClasses}>
				{tasks?.map(({ description, id, status }) => (
					<List.Item
						key={id}
						icon={
							status === "completed" ? (
								<CheckCircleOutlined className={classes.completedIcon} />
							) : (
								<ExclamationCircleOutlined className={classes.warningIcon} />
							)
						}
					>
						<Text className={classes.fullWidth}>{description}</Text>
						<Group spacing={0}>
							<ActionIcon size="xl" onClick={() => handleCompletedClick(id, status)}>
								<CheckSquareOutlined size={20} className={classes.approveIcon} />
							</ActionIcon>
							<ActionIcon size="xl" onClick={() => handleDeleteClick(id)}>
								<CloseSquareOutlined size={20} className={classes.deleteIcon} />
							</ActionIcon>
						</Group>
					</List.Item>
				))}
			</List>
		</div>
	);
};
