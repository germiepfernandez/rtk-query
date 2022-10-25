import { AppShell, createStyles, CSSObject } from "@mantine/core";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

const useStyles = createStyles((theme) => ({
	main: {
		background: "#F9FAFB", // TODO: add color to default theme
		height: "calc(100vh - 80px)",
		minWidth: "500px",
		maxWidth: "1250px",
		margin: "0 auto",
		overflow: "auto",
	},
}));

const AppContainer = () => {
	const { classes } = useStyles();

	return (
		<AppShell classNames={{ main: classes.main }} header={<Header />}>
			<Outlet></Outlet>
		</AppShell>
	);
};

export default AppContainer;
