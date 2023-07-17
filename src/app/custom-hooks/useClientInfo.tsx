import { Client } from '../types';
import { useState } from "react"
import { supabase } from "../supabase/supabaseClient"
import { PostgrestError } from '@supabase/supabase-js';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { infoClient, changeInfo } from '../redux/clientInfoSlice';
import { addClient, updateClient } from '../redux/clientSlice';
import { ClientInfoState } from '../types';
interface clientDataState {
    client: Client
}

export function useClientInfo() {

    const clientInfo = useSelector((state: RootState) => state.infoClient)

    const newClient = useSelector((state: RootState) => state.newClient)

    const dispatch = useDispatch()

    const [infoMessage, setInfoMessage] = useState("")

    const selectClientInfoApi = async (id: string) => {
        if (id !== clientInfo.id) {
            const { data, error }: { data: Client[] | null, error: PostgrestError | null } = await supabase.rpc("select_one", {
                client_id: id
            })
            data?.map((client: Client) => {
                // setClientInfo(client)
                dispatch(infoClient(client))
            })
            data?.length === 0 ? setInfoMessage("No se encontro informacion del cliente solicitado") : setInfoMessage("")
        }
    }

    const insertInfoApi = async () => {
        // const { id, ...client } = client
        const { data, error } = await supabase.from("tbl_clients").insert(clientInfo)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha ingresado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
    }

    const updateInfoApi = async () => {
        // const { id, ...clientInfo } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").update(clientInfo).eq("id", clientInfo.id)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha actualizado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
    }

    const deleteInfoApi = async () => {
        const { id } = clientInfo
        const { data, error } = await supabase.from("tbl_clients").delete().eq("id", id)
        error ? setInfoMessage(error.message) : setInfoMessage(`Se ha eliminado exitosamente el cliente ${clientInfo.name} ${clientInfo.lastname}`)
    }

    const handleClientInfo = (id: string) => {
        selectClientInfoApi(id)
    }

    const handleChangeNewInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // setClientInfo({ ...client, [e.target.name]: e.target.value })
        dispatch(updateClient({ property: e.target.name as keyof ClientInfoState, value: e.target.value }))
    }

    const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // setClientInfo({ ...client, [e.target.name]: e.target.value })
        dispatch(changeInfo({ property: e.target.name as keyof ClientInfoState, value: e.target.value }))
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
        newClient,
        infoMessage,
        handleClientInfo,
        handleChangeInfo,
        handleSubmit,
        handleUpdate,
        handleDelete,
        handleChangeNewInfo
    }

}