import { createContext, useContext, useState, useEffect } from 'react';

interface TabType {
    label: string
    url: string
    props?: Record<string, unknown>
}

interface PropsContext {
    children?: React.ReactNode
}

type TabContextType = {
    tabs: TabType[]
    newTab: TabType
    handleAddTab: (newLabel: string, newComponent: string, props?: Record<string, unknown>) => void
    handleNewTab: () => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const useTabContext = (): TabContextType => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext debe ser utilizado dentro de un proveedor TabContext');
    }
    return context;
}


const TabContextProvider: React.FC<PropsContext> = ({ children }) => {
    const [tabs, setTabs] = useState<TabType[]>([])
    const [newTab, setNewTab] = useState<TabType>({ label: "", url: "" })

    const handleAddTab = (newLabel: string, newComponent: string, props?: Record<string, unknown>) => {
        setNewTab({
            label: newLabel,
            url: newComponent,
            props: props
        })
    }

    const handleNewTab = () => {
        const tab = tabs?.find(tab => tab.label === newTab.label)
        if (newTab.label !== "" && typeof tab !== "object") {
            setTabs([...tabs, newTab])
        }
        // if (id !== newTab.props?.id) {
        //     setTabs(tabs?.filter(tab => tab.label !== newTab.label))
        //     console.log(tabs)
        //     setTabs([...tabs, newTab])
        //     console.log(tabs)
        // }
    }

    useEffect(() => {
        handleNewTab()
    }, [newTab])

    const contextValue: TabContextType = {
        tabs,
        newTab,
        handleAddTab,
        handleNewTab
    };

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
};

export default TabContextProvider