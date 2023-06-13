import { supabase } from "../supabase/supabaseClient"
import { useState } from "react"
import { DocumentTypes } from '../types';

interface clientDocumentState {
    documentTypes: DocumentTypes
}

export function useDocumentTypes() {
    const [documentTypes, setDocumentTypes] = useState<Array<clientDocumentState['documentTypes']> | null>([])

    const fetchDocumentTypes = async () => {
        const { data, error } = await supabase.from('tbl_document_type').select('id, description')
        if (error) console.log(error)
        return data
    }

    const getAllDocuments = async () => {
        const data: DocumentTypes[] | null = await fetchDocumentTypes()
        setDocumentTypes(data)
    }

    const getDocumentDescription = (id: number): String => {
        const description = documentTypes?.find(document => document.id === id)?.description
        return typeof description === 'string' ? description : "No se pudo recuperar el tipo de documento."
    }

    return {
        documentTypes,
        getAllDocuments,
        getDocumentDescription
    }
}