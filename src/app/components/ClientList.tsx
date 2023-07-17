"use client"
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useAllClient } from '../custom-hooks/useAllClient'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import ClientCard from './ClientCard'
import ButtonActions from './ButtonActions'
export default function ClientList() {

    const { getAllDocuments, getDocumentDescription } = useDocumentTypes()
    const { clientsData, getAllClients } = useAllClient()

    useEffect(() => {
        getAllClients()
        getAllDocuments()
    }, [])


    return (
        // <ul className={styles.list}>
        //     {
        //         Array.isArray(clientsData) ? clientsData.map(client => (
        //             <ClientCard key={client.id} ClientCard={client} />
        //         )) : <p className={styles.title}> No hay datos </p>
        //     }
        // </ul>
        <div>
            <DataTable value={clientsData} showGridlines tableStyle={{ minWidth: '50rem' }} >
                <Column field='name' header="Name" />
                <Column field='lastname' header="Lastname" />
                <Column field='document' header="Document" />
                <Column header="Actions" body={ButtonActions} />
            </DataTable>
        </div>
    )
}