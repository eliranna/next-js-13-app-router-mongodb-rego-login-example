import { ReactNode } from 'react';
import PageHead from './PageHead';
import Navbar from './Navbar';

export default function RootLayout ({ title, children }: {title?: string, children: ReactNode}) {

    return (
        <div>
            <PageHead title={title}/>
            <div>
                <div className='min-h-screen mb-32'>
                    <div>
                        <Navbar/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <div className='bg-black h-[200px] w-full'>
               
                </div>
            </div>
        </div>
    )
}