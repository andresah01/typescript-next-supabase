"use client"
import { useRouter } from "next/navigation"

export default function ButtonRouter({ route, info }: { route: string, info: string }) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(route)}>{info}</button>
    )

}