import { useQuery } from "react-query";

import { TaskService } from "../services";

const useTasks = () => {
    return useQuery(
        ["tasks"],
        () => TaskService.fetchTasksData(),
    )
}

export default useTasks;