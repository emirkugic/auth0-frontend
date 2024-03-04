import { User } from "..";

type UserItemProps = {
    user: User;
    handleEditButtonClick: (user: User) => void;
};

export default UserItemProps;
