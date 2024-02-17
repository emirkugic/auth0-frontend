type User = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    dateOfBirth?: string | null;
    authKey?: string;
};

export default User;