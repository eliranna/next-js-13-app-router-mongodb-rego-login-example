import 'globals.css';

import { Assistant } from "next/font/google";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata = {
    title: 'Next.js 13 - User Registration and Login Example'
}

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir='ltr'>
            <body className={assistant.className}>
                {children}
            </body>
        </html>
    );
}
