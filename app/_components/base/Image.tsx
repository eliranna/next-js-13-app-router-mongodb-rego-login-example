const Image = ({src, className}: {src: string, className?: string}) => (
    <div className={className} style={{ 
        backgroundImage: `url(${src})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat' 
    }}/>
)

export default Image