"use client"
import { useRouter } from "next/navigation"

export default function ButtonRouter({ route, message }: { route: string, message: string }) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(route)}>{message}</button>
    )

}