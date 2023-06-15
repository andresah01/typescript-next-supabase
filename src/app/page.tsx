import styles from './page.module.css'
import ClientList from './components/ClientList'
import ButtonRouter from './components/ButtonRouter'

export default function Home() {
  return (
    <section>
      <h1 className={styles.title}> Clientes </h1>
      <ButtonRouter route="/client" message="+ Nuevo usuario" />
      <ClientList />
    </section>
  )
}
