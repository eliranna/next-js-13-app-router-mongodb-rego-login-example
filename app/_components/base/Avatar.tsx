import Image from "./Image"

const Avatar = ({src, className}: {src: string, className: string}) =>  <Image className={`${className} rounded-full`} src={src as string}/>

export default Avatar