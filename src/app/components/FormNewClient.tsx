"use client"
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useClientInfo } from '../custom-hooks/useClientInfo'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'
import ButtonRouter from './ButtonRouter'

export default function FormNewClient() {


    const { newClient, handleChangeNewInfo, handleSubmit } = useClientInfo()

    const { documentTypes, getAllDocuments } = useDocumentTypes()

    useEffect(() => {
        getAllDocuments()
    }, [])

    return (
        <div>
            <h2 className={styles.title}> Ingrese los datos del nuevo usuario</h2>
            {/* <ButtonRouter route="/" message="Inicio" /> */}
            {/* {infoMessage !== "" && <InfoMessage message={infoMessage} />} */}
            <form>
                <div className={styles.formGroup}>
                    <label> Nombre </label>
                    <input type="text" name="name" placeholder="Nombre" onChange={handleChangeNewInfo} value={newClient?.name} />
                </div>
                <div className={styles.formGroup}>
                    <label> Apellidos </label>
                    <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChangeNewInfo} value={newClient?.lastname} />
                </div>
                <div className={styles.formGroup}>
                    <label> Tipo de documento </label>
                    <select name="document_type" onChange={handleChangeNewInfo} value={newClient?.document_type}>
                        <option value={0}> Seleccione el tipo de documento </option>
                        {
                            documentTypes?.map(documentType => (
                                <option key={documentType.id} value={documentType.id}>{documentType.description}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label> Documento </label>
                    <input type="text" name="document" placeholder="Numero de documento" onChange={handleChangeNewInfo} value={newClient?.document} />
                </div>
                <div className={styles.formGroup}>
                    <label> Numero de telefono </label>
                    <input type="text" name="phone" placeholder="Numero telefonico" onChange={handleChangeNewInfo} value={newClient?.phone} />
                </div>
                <div className={styles.formGroupButton}>
                    <div>
                        <button onClick={handleSubmit}> Ingresar </button>
                    </div>
                </div>
            </form>
        </div>
    )
}