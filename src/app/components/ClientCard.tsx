import { Client } from '../types'
import styles from '../page.module.css'
import Image from 'next/image'
import { useTabContext } from '../context/TabContext'

interface CardProps {
    ClientCard: Client
}
export default function ClientCard({ ClientCard }: CardProps) {

    const { id, name, lastname, document, phone, document_type } = ClientCard

    const { tabs, handleAddTab } = useTabContext()

    return (
        <li key={id} className={styles.card}>
            {/* <Image className={styles.image} src={`https://i.pravatar.cc/150?img=${Math.random()}`} alt={name} width={100} height={100} /> */}
            <div className={styles.name}>
                <h2>{`${name} ${lastname}`}</h2>
            </div>
            <div className={styles.info}>
                {/* <p>Tipo de documento: {getDocumentDescription(document_type)}</p> */}
                <p>Numero de documento: {document}</p>
                <p>Telefono: {phone}</p>
            </div>
            <button onClick={() => handleAddTab("Ver mas", "FormClient", { id: id })}>Ver mas</button>
            {/* <ButtonRouter route={`/client/${id}`} message="Ver mas" /> */}
        </li>
    )
}