import React from "react";
import { ActionIcon, Anchor, Avatar, createStyles, Group, Header as MantineHeader, Menu, Text } from "@mantine/core";
import { NavLink } from "../components";

const useStyles = createStyles(() => ({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "12px 16px",
		border: "1px solid #F7F8F9", // TODO: add color to default theme
	},
	logo: {
		height: "34px",
	},
	pointer: {
		cursor: "pointer",
	},
}));

const Header = () => {
	const { classes } = useStyles();

	return (
		<MantineHeader height={60} className={classes.container}>
			<Group spacing="xl">
				<NavLink to="pokemon">
					<Text>Pokemon</Text>
				</NavLink>
				<NavLink to="tasks-slice">
					<Text>Tasks (RTK Slice)</Text>
				</NavLink>
				<NavLink to="tasks-service">
					<Text>Tasks (RTK Query)</Text>
				</NavLink>
			</Group>
		</MantineHeader>
	);
};

export default Header;
