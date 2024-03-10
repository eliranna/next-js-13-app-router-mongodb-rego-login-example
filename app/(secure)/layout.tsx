import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '_helpers/server';
import { Alert, Nav } from '_components';

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    // if not logged in redirect to login page
    if (!auth.isAuthenticated()) {
        const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
        redirect(`/account/login?returnUrl=${returnUrl}`);
    }

    return (
        <div>
            <div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
