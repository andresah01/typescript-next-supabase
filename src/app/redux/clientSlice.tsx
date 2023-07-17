import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ClientInfoState } from '../types'

const newClientState: ClientInfoState = {
    id: "",
    name: "",
    lastname: "",
    phone: "",
    document: "",
    document_type: 0
}

type ChangeInfoPayload = {
    property: keyof ClientInfoState;
    value: string | number;
}

export const newClientSlice = createSlice(
    {
        name: "newClient",
        initialState: newClientState,
        reducers: {
            addClient: (state, action) => {
                const { id, name, lastname, phone, document, document_type } = action.payload
                state.id = id
                state.name = name
                state.lastname = lastname
                state.phone = phone
                state.document = document
                state.document_type = document_type
            },
            updateClient: (state, action: PayloadAction<ChangeInfoPayload>): ClientInfoState => {
                const { property, value } = action.payload
                return { ...state, [property]: value }

            }
        }
    }
)

export const { addClient, updateClient } = newClientSlice.actions
export default newClientSlice.reducer

