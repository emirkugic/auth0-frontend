import { Subtask } from "..";

type Task = {
    id: number;
    name: string;
    status: boolean;
    subtasks: Subtask[];
}

export default Task;