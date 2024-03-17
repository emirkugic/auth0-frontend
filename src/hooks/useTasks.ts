import { useQuery } from "react-query";

import { TaskService } from "../services";

const useTasks = (userId: number) => {
    return useQuery(
        ["tasks"],
        () => TaskService.fetchTasksByUserId(userId),
    )
}

export default useTasks;