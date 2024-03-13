const Image = ({src, className, style}: {src: string, className?: string, style?: any}) => (
    <div className={className} style={{ 
        backgroundImage: `url(${src})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        ...style
    }}/>
)

export default Image