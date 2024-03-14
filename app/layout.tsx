import { EditModeProvider } from '_helpers/client/useEditMode';
import 'globals.css';

import { Assistant } from "next/font/google";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata = {
    title: 'Cyberpad'
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir='ltr'>
            <body className={assistant.className}>
                <EditModeProvider>
                    {children}
                </EditModeProvider>
            </body>
        </html>
    );
}

export default Layout;
