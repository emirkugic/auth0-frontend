type User = {
    id?: number,
    firstName?: string
    lastName?: string
    username?: string
    date_of_birth?: string
    password?: string
    email: string
    roles?: string[],
    imageUrl?: string
}

export default User;