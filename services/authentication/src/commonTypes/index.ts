export interface UserInfo {
    id: number,
    name: string,
    email: string,
    password: string,
    company: string,
    title: string,
    entitlements: number
}

export interface ValidationType {
    name: string,
    error: string,
    length?: {
        min: number,
        max: number
    }
}

export interface Token {
    token: string
}

export interface AuthBody {
    email: string,
    password: string
}