import { Dispatch, SetStateAction } from "react";
import { PopupType } from "../../enums";
import { FadeProps, User } from "..";

type EditUserProps = {
    user?: User;
    setShowPopup: Dispatch<SetStateAction<PopupType | null>>;
    isVisible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    fadeProps: FadeProps
}

export default EditUserProps