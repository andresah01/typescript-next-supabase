import { Client } from "../types"
import { useState } from "react"
import { supabase } from "../supabase/supabaseClient"

interface clientDataState {
    client: Client
}
export function useClientInfo() {
    const [clientInfo, setClientInfo] = useState<clientDataState['client']>({
        id: 0,
        name: '',
        lastname: '',
        phone: '',
        document: '',
        document_type: 0
    })

    const selectClientInfoApi = async (id: number) => {
        const { data, error } = await supabase.rpc("select_one", {
            client_id: id
        })
        data.map((client: Client) => setClientInfo(client))
    }

    const insertInfoApi = async () => {
        const { id, ...client } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").insert(client)
        console.log({ data, error })
    }

    const updateInfoApi = async () => {
        const { id, ...client } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").update(client).eq("id", id)
        console.log({ data, error })
    }

    const deleteInfoApi = async () => {
        const { id } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").delete().eq("id", id)
        console.log({ data, error })
    }

    const handleClientInfo = (id: number) => {
        selectClientInfoApi(id)
    }

    const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setClientInfo({ ...clientInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        confirm("¿Desea ingresar?") && insertInfoApi()
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        confirm("¿Desea actualizar?") && updateInfoApi()
    }


    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        confirm("¿Desea borrar?") && deleteInfoApi()

    }

    return {
        clientInfo,
        handleClientInfo,
        handleChangeInfo,
        handleSubmit,
        handleUpdate,
        handleDelete
    }

}