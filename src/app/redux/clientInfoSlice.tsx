import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ClientInfoState } from '../types'

const clientInfoState: ClientInfoState = {
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

export const showClientSlice = createSlice(
    {
        name: "showClient",
        initialState: clientInfoState,
        reducers: {
            infoClient: (state, action: PayloadAction<ClientInfoState>) => {
                const { id, name, lastname, phone, document, document_type } = action.payload
                state.id = id
                state.name = name
                state.lastname = lastname
                state.phone = phone
                state.document = document
                state.document_type = document_type
            },
            changeInfo: (state, action: PayloadAction<ChangeInfoPayload>) => {
                const { property, value } = action.payload
                return { ...state, [property]: value }
            }
        }
    }
)

export const { infoClient, changeInfo } = showClientSlice.actions
export default showClientSlice.reducer