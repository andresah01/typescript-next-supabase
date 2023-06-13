import { Client } from '../types';
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

    const [infoMessage, setInfoMessage] = useState("")

    const selectClientInfoApi = async (id: number) => {
        const { data, error } = await supabase.rpc("select_one", {
            client_id: id
        })
        data.map((client: Client) => setClientInfo(client))
        data.length === 0 ? setInfoMessage("No se encontro informacion del cliente solicitado") : setInfoMessage("")
    }

    const insertInfoApi = async () => {
        const { id, ...client } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").insert(client)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha ingresado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
    }

    const updateInfoApi = async () => {
        const { id, ...client } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").update(client).eq("id", id)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha actualizado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
    }

    const deleteInfoApi = async () => {
        const { id } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").delete().eq("id", id)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha eliminado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
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
        infoMessage,
        handleClientInfo,
        handleChangeInfo,
        handleSubmit,
        handleUpdate,
        handleDelete
    }

}