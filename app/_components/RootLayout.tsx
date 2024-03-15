import { ReactNode } from 'react';
import PageHead from './PageHead';
import Navbar from './Navbar';
import ImageStrip from './base/ImageStrip';
import { useLocality } from '_helpers/client/useLocality';

export default function RootLayout ({ title, hideFooter, children }: {title?: string, hideFooter?: boolean, children: ReactNode}) {

    const {language, direction } = useLocality()

    return (
        <div dir={direction} lang={language}>
            <PageHead title={title}/>
            <div>
                <div className={`min-h-screen ${!hideFooter && 'mb-20'}`}>
                    <div>
                        <Navbar/>
                    </div>
                    <div className='w-full'>
                        <ImageStrip/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                
                {!hideFooter &&(
                    <div className='bg-black h-[200px] w-full'>
                    
                    </div>
                )}                
            </div>
        </div>
    )
}