import { MouseEvent } from "react";

type HeaderMenuProps = {
    anchorEl: null | HTMLElement,
    open: boolean,
    handleClose: (event: MouseEvent<HTMLButtonElement>) => void
}

export default HeaderMenuProps;