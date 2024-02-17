import { MouseEvent } from "react";

const ProfileMenu = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLButtonElement>) => void }) => {
    return (
        <button onClick={handleProfileClick}>
            Profile
        </button>
    )
}

export default ProfileMenu;
