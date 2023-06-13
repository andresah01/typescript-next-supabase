"use client"
import styles from '../page.module.css'
import { useEffect } from 'react'
import { useClientInfo } from '../custom-hooks/useClientInfo'
import { useDocumentTypes } from '../custom-hooks/useDocumentTypes'
import ButtonRouter from './ButtonRouter';

export default function FormNewClient() {

    const { handleChangeInfo, handleSubmit } = useClientInfo()

    const { documentTypes, fetchDocumentTypes } = useDocumentTypes()

    useEffect(() => {
        fetchDocumentTypes()
    }, [])

    return (

        <div>
            <h2 className={styles.title}> Ingrese los datos del nuevo usuario</h2>
            <ButtonRouter route="/" info="Inicio" />
            <form>
                <div className={styles.formGroup}>
                    <label htmlFor="name"> Nombre </label>
                    <input type="text" name="name" placeholder="Nombre" onChange={handleChangeInfo} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="usuario"> Apellidos </label>
                    <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChangeInfo} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="document_type"> Tipo de documento </label>
                    <select name="document_type" onChange={handleChangeInfo}>
                        <option value={0}> Seleccione el tipo de documento </option>
                        {
                            documentTypes.map(documentType => (
                                <option key={documentType.id} value={documentType.id}>{documentType.description}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="website"> Documento </label>
                    <input type="text" name="document" placeholder="Numero de documento" onChange={handleChangeInfo} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone"> Numero de telefono </label>
                    <input type="text" name="phone" placeholder="Numero telefonico" onChange={handleChangeInfo} />
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