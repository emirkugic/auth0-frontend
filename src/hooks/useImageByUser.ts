import { useQuery } from "react-query"
import { ImageService } from "../services"

const useImageByUser = (userId: number) => {
    return useQuery(
        ['userImage'],
        () => ImageService.fetchImageByUserId(userId)
    )
}

export default useImageByUser
