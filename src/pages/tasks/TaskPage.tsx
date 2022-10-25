import React, { useState } from "react";
import { ActionIcon, Button, createStyles, Group, List, Text, TextInput, Title } from "@mantine/core";
import { CheckCircleOutlined, CheckSquareOutlined, CloseSquareOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { theme } from "../../theme";
import { useTask } from "../../hooks";
import { useAppDispatch } from "../../redux/hooks";
import { addTask, deleteTask, updateTask } from "../../redux/slice";

const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		gap: "10px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
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

export const TaskPage = () => {
	const { classes } = useStyles();
	const { classes: listClasses } = useListStyles();

	const [task, setTask] = useState("");

	const state = useTask();
	const dispatch = useAppDispatch();

	const handleCompletedClick = (id: string) => {
		dispatch(updateTask({ id, status: "completed" }));
	};

	const handleDeleteClick = (id: string) => {
		dispatch(deleteTask(id));
	};

	const handleSubmit = () => {
		dispatch(addTask(task));
	};

	return (
		<div className={classes.container}>
			<header>
				<Title order={2}>Todo List</Title>
			</header>
			<Group spacing="lg" className={classes.inputContainer}>
				<TextInput placeholder="Add new Tasks" className={classes.fullWidth} value={task} onChange={(e) => setTask(e.target.value)} />
				<Button onClick={handleSubmit}>Submt</Button>
			</Group>
			<List classNames={listClasses}>
				{state.tasks.map(({ description, id, status }) => (
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
							<ActionIcon size="xl" onClick={() => handleCompletedClick(id)}>
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
