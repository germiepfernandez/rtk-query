import { Anchor } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export interface NavLinkProps extends LinkProps {
	classNames?: Record<string, string>;
}

export const useStyles = createStyles((theme) => ({
	active: {
		color: theme.colors.blue[6],
		fontWeight: "bold",
		padding: "5px 15px",
		borderBottom: `2px solid ${theme.colors.blue[4]}`,
	},
	button: {
		// width: "100%",
		padding: "0 15px",
	},
}));

const NavLink = ({ children, to, classNames }: NavLinkProps) => {
	const { classes, cx } = useStyles(undefined, { name: "Navlink", classNames: classNames });
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Anchor component={Link} to={to} variant="text" className={cx(classes.button, { [classes.active]: match ? true : false })}>
			{children}
		</Anchor>
	);
};

export default NavLink;
