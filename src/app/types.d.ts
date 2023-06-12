export interface User {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string   
}

export type UserAPI = {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
        lat: string
        lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export type UsersAPI = Array<{
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
        lat: string
        lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}>

export interface Client {
    readonly id: number
    name: string
    lastname: string
    phone: string
    document: string
    document_type: number
}

export interface DocumentTypes {
    readonly id: number
    description: string
}