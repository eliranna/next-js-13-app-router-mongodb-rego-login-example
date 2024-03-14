import RootLayout from "./RootLayout"
import Grid from "./base/Grid"
import SectionHeader from "./SectionHeader"
import { Page } from "./base/Page"
import { ReactNode } from "react"

export type SectionHeader = {
    title?: string,
    description?: string,
    topic?: string,
    editMode?: boolean,
    custom?: ReactNode
}

const Section = ({header, children}: {header: SectionHeader, children?: ReactNode}) => {
    return (
        <RootLayout>
            <Page>
                <Grid className='mt-20'>
                    <div className="lg:col-start-1 lg:col-span-4">
                        <SectionHeader {...header}/>
                    </div>
                    <div className="lg:col-start-6 lg:col-span-6 flex gap-6">
                        <div className="flex flex-col w-full gap-10">
                            {children}
                        </div>
                    </div>
                </Grid>
            </Page>
        </RootLayout>        
    )
}

export default Section