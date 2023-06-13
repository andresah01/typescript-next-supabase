"use client"
import styles from './page.module.css'
import ClientList from './components/ClientList'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <section>
      <h1 className={styles.title}> Clientes </h1>
      <button onClick={() => router.push('/client')}> + Nuevo usuario</button>
      <ClientList />
    </section>
  )
}
