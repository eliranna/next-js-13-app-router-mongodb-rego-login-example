import { EditModeProvider } from '_helpers/client/useEditMode';
import { LocalityProvider } from '_helpers/client/useLocality';
import 'globals.css';

import { Assistant } from "next/font/google";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata = {
    title: 'Cyberpad'
}

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <LocalityProvider>
            <html>
                <body className={assistant.className}>
                    <EditModeProvider>
                        {children}
                    </EditModeProvider>
                </body>
            </html>
        </LocalityProvider>
    );
}

export default Layout;
