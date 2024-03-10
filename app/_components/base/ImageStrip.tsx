import Image from './Image';

const ImageStrip = ({image}: {image: string}) => (
    <div className='w-full h-[42vh]'>
        <Image src={image} className='w-full h-full bg-center'/>
    </div>
)

export default ImageStrip