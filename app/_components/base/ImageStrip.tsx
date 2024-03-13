import Image from './Image';

const ImageStrip = ({image}: {image?: string}) => (
    <div className='w-full h-[18px]'>
        <Image src={'https://cdn.midjourney.com/307fa07f-8495-44d0-98d7-cb8b69b14c28/0_0.webp'} className='w-full h-full bg-center'/>
    </div>
)

export default ImageStrip