import { User } from "..";

type UserState = {
    user: User | null,
    loading: boolean,
    error: string | null,
}

export default UserState;