import { useMutation } from "react-query";
import { AuthService } from "../services";

const useResetPassword = () => {
    return useMutation(
        (
            { password, confirmPassword, userId }: { password: string, confirmPassword: string, userId: number }
        ) => AuthService.resetPassword(password, confirmPassword, userId)
    )
}

export default useResetPassword;
