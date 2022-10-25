import { useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectTasks } from "../redux/slice";

export const useTask = () => {
	const taskState = useAppSelector(selectTasks);

	return useMemo(() => taskState, [taskState]);
};
