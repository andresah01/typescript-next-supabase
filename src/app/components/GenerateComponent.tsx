// import FormClient from "./FormClient"
// import ClientList from "./ClientList"
// import FormNewClient from "./FormNewClient"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface Props {
    componentName: string
    props: Record<string, unknown>
}

const componentsList: { [key: string]: React.ComponentType } = {
    FormClient: dynamic(() => import("./FormClient")),
    ClientList: dynamic(() => import("./ClientList")),
    FormNewClient: dynamic(() => import("./FormNewClient")),
}

export default function GenerateComponent({ componentName, props }: Props) {
    const Component = componentsList[componentName]

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Component {...props} />
        </Suspense>
    )
}