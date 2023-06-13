"use client"
import Image from 'next/image'
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAllClient } from '../custom-hooks/useAllClient'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'

export default function ClientList() {

    const { clientsData, getAllClients } = useAllClient()

    const { getAllDocuments, getDocumentDescription } = useDocumentTypes()

    const router = useRouter()

    useEffect(() => {
        getAllClients()
        getAllDocuments()
    }, [])

    return (
        <ul className={styles.list}>
            {
                clientsData.map(client => (
                    <li key={client.id} className={styles.card}>
                        <Image className={styles.image} src={`https://i.pravatar.cc/150?img=${client.id}`} alt={client.name} width={100} height={100} />
                        <div className={styles.name}>
                            <h2>{`${client.name} ${client.lastname}`}</h2>
                        </div>
                        <div className={styles.info}>
                            <p>Tipo de documento: {getDocumentDescription(client.document_type)}</p>
                            <p>Numero de documento: {client.document}</p>
                            <p>Telefono: {client.phone}</p>
                        </div>
                        <button onClick={() => router.push(`/client/${client.id}`)}>Ver mas...</button>
                    </li>
                ))
            }
        </ul>
    )
}