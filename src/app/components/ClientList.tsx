import Image from 'next/image'
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAllClient } from '../custom-hooks/useAllClient'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'
import { supabase } from '../supabase/supabaseClient'
import { Client } from '../types'
import ButtonRouter from './ButtonRouter'
import ClientCard from './ClientCard'

const getAllClients = async () => {
    const response = await fetch("https://vjhdrslenbwlgpmqpwcb.supabase.co/rest/v1/rpc/select_all", {
        headers: {
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`
        },
        cache: "no-store"
    }).then(response => response.json())
    return response
}

export default async function ClientList() {

    const clientsData: Client[] = await getAllClients()

    // const { getAllDocuments, getDocumentDescription } = useDocumentTypes()

    // useEffect(() => {
    //     getAllClients()
    //     getAllDocuments()
    // }, [])

    return (
        <ul className={styles.list}>
            {
                Array.isArray(clientsData) ? clientsData.map(client => (
                    <ClientCard key={client.id} ClientCard={client} />
                )) : <p className={styles.title}> No hay datos </p>
            }
        </ul>
    )
}