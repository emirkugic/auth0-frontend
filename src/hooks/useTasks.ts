import { useQuery } from "react-query";

import { TaskService } from "../services";

const useTasks = (teamName: string) => {
    return useQuery(
        ["tasks"],
        () => TaskService.fetchTasksByUserId(teamName),
    )
}

export default useTasks;