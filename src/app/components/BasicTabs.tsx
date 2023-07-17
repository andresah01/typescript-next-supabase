import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from './TabPanel'
import GenerateComponent from './GenerateComponent'

interface TabType {
    label: string
    url: string
    props?: Record<string, unknown>
}

interface Props {
    tabs: TabType[]
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabPages({ tabs }: Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable"
                    scrollButtons="auto" aria-label="scrollable tabs example">
                    {
                        tabs?.map((tab, index) => (
                            <Tab key={index} label={tab.label} {...a11yProps(index)} value={index} />
                        ))
                    }
                </Tabs>
            </Box>
            {
                tabs?.map((tab, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        <GenerateComponent key={index} componentName={tab.url} props={tab?.props ?? {}} />
                    </TabPanel>

                ))
            }
        </Box>
    );
}