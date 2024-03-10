import Image from "./Image"

const Avatar = ({src}: {src: string}) =>  <Image className={'w-[25px] h-[25px] rounded-full'} src={src as string}/>

export default Avatar