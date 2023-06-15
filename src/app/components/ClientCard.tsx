import { Client } from '../types'
import styles from '../page.module.css'
import ButtonRouter from './ButtonRouter'
import Image from 'next/image'

interface CardProps {
    ClientCard: Client
}
export default function ClientCard({ ClientCard }: CardProps) {

    const { id, name, lastname, document, phone, document_type } = ClientCard

    return (
        <li key={id} className={styles.card}>
            <Image className={styles.image} src={`https://i.pravatar.cc/150?img=${Math.random()}`} alt={name} width={100} height={100} />
            <div className={styles.name}>
                <h2>{`${name} ${lastname}`}</h2>
            </div>
            <div className={styles.info}>
                {/* <p>Tipo de documento: {getDocumentDescription(document_type)}</p> */}
                <p>Numero de documento: {document}</p>
                <p>Telefono: {phone}</p>
            </div>
            <ButtonRouter route={`/client/${id}`} message="Ver mas" />
        </li>
    )
}