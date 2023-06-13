import styles from '../page.module.css'


export default function InfoMessage({ message }: { message: string }) {
    return (
        <h4 className={styles.title}>{message}</h4>
    )
}