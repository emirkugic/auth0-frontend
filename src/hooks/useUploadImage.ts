import { useMutation } from "react-query"
import { ImageService } from "../services";

const useUploadImage = () => {
    return useMutation(
        ({ formData, userId }: { formData: FormData, userId: number }) => ImageService.uploadImage(formData, userId),
    )
}

export default useUploadImage
