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