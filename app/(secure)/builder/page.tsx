import QBuilder from "_components/QBuilder"
import RootLayout from "_components/RootLayout"
import { Page } from "_components/base/Page"

const BuilderPage = () => {
    return (
        <RootLayout>
            <Page>
                <QBuilder/>
            </Page>
        </RootLayout>
        
    )
}

export default BuilderPage