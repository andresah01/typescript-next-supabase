"use client"
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useClientInfo } from '../custom-hooks/useClientInfo'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'
import ButtonRouter from './ButtonRouter'
import InfoMessage from './InfoMessage'

export default function FormClient() {

    const { clientInfo, infoMessage, handleClientInfo, handleChangeInfo, handleSubmit, handleUpdate, handleDelete } = useClientInfo()

    const { documentTypes, getAllDocuments } = useDocumentTypes()

    const params = useParams()

    useEffect(() => {
        getAllDocuments()
        const { id } = params
        typeof id === "string" && handleClientInfo(id)
    }, [])

    return (
        <div>
            <h2 className={styles.title}> Ingrese los datos del nuevo usuario</h2>
            <ButtonRouter route="/" message="Inicio" />
            {infoMessage !== "" && <InfoMessage message={infoMessage} />}
            <form>
                <div className={styles.formGroup}>
                    <label htmlFor="name"> Nombre </label>
                    <input type="text" name="name" placeholder="Nombre" onChange={handleChangeInfo} value={clientInfo?.name} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="usuario"> Apellidos </label>
                    <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChangeInfo} value={clientInfo?.lastname} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="document_type"> Tipo de documento </label>
                    <select name="document_type" onChange={handleChangeInfo} value={clientInfo?.document_type}>
                        <option value={0}> Seleccione el tipo de documento </option>
                        {
                            documentTypes?.map(documentType => (
                                <option key={documentType.id} value={documentType.id}>{documentType.description}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="website"> Documento </label>
                    <input type="text" name="document" placeholder="Numero de documento" onChange={handleChangeInfo} value={clientInfo?.document} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone"> Numero de telefono </label>
                    <input type="text" name="phone" placeholder="Numero telefonico" onChange={handleChangeInfo} value={clientInfo?.phone} />
                </div>
                <div className={styles.formGroupButton}>
                    {
                        clientInfo?.id === '' ?
                            <div>
                                <button onClick={handleSubmit}> Ingresar </button>
                            </div> :
                            <div>
                                <button onClick={handleUpdate}> Actualizar</button>
                                <button onClick={handleDelete}> Borrar</button>
                            </div>
                    }
                </div>
            </form>
        </div>
    )
}