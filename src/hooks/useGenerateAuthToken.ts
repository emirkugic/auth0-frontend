import { useMutation } from "react-query"
import { AuthService } from "../services"

const useGenerateAuthToken = () => {
    return useMutation(
        ({ email, role }: { email: string, role: string }) => AuthService.generateAuthToken(email, role)
    )
}

export default useGenerateAuthToken
