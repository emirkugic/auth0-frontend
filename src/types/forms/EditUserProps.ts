import { Dispatch, SetStateAction } from "react";
import { PopupType } from "../../enums";
import { FadeProps } from "..";

type EditUserProps = {
    setShowPopup: Dispatch<SetStateAction<PopupType | null>>;
    isVisible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    fadeProps: FadeProps
}

export default EditUserProps