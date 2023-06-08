"use client"
import styles from './page.module.css'
import UserList from './components/UserList'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Usuarios JSONPlaceholder </h1>
      <button onClick={() => router.push('/user')}> + Nuevo usuario</button>
      <UserList />
    </main>
  )
}
