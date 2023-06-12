import { supabase } from "../supabase/supabaseClient"
import { useState } from "react"
import { DocumentTypes } from '../types';

interface clientDocumentState {
    documentTypes: DocumentTypes
}

export function useDocumentTypes() {
    const [documentTypes, setDocumentTypes] = useState<Array<clientDocumentState['documentTypes']>>([])

    const handleDocumentTypes = async () => {
        const { data, error } = await supabase.from('tbl_document_type').select('id, description')
        setDocumentTypes(data || [])
    }

    return {
        documentTypes,
        handleDocumentTypes
    }
}