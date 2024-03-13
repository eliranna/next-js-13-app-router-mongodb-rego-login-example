import Image from "./Image"

const Avatar = ({src, size = 45, className}: {src: string, size?: number, className?: string}) =>  <Image className={`${className} rounded-full`} style={{width: `${size}px`, height: `${size}px`}} src={src as string}/>

export default Avatar