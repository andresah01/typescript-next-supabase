export interface Client {
    readonly id: string
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

interface ClientInfoState {
    id: string
    name: string
    lastname: string
    phone: string
    document: string
    document_type: number
}
