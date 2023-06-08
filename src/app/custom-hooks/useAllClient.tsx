import { useState } from "react"
import { Client } from "../types"
import { supabase } from "../supabase/supabaseClient"

interface clientDataState {
    client: Client
}
export function useAllClient() {
    const [clientsData, setClientsData] = useState<Array<clientDataState['client']>>([])

    const getAllClients = async () => {
        const data: Array<Client> = await fetchAllClients()
        setClientsData(data)
        console.log({ clientsData })
    }

    const fetchAllClients = async (): Promise<Client[]> => {
        const { data, error } = await supabase.rpc("select_all")
        if (error) console.log(error)
        return data
    }

    return {
        clientsData,
        getAllClients
    }
}