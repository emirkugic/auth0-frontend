import { useMutation, useQueryClient } from "react-query"
import { UserService } from "../services"
import { User } from "../types";

const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ userId, userData }: { userId: number, userData: User }) => UserService.updateUser(userId, userData),
        {
            onSuccess() {
                queryClient.invalidateQueries(['users'])
            }
        }
    )
}

export default useUpdateUser
