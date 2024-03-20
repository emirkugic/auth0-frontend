import { useMutation } from "react-query"
import { ImageService } from "../services";

const useUploadImage = () => {
    return useMutation(
        (formData: FormData) => ImageService.uploadImage(formData),
    )
}

export default useUploadImage
