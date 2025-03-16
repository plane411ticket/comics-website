export interface User {
    _id: string
    name: string
    email: string
}

export interface TokenUser extends User {
    token: string // access token
}

export interface PasswordUser extends User {
    password: string
}