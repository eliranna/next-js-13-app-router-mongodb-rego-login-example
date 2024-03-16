import { IResultInfo } from "_services/useResultsService"
import Avatar from "./base/Avatar"
import { useLocality } from "_helpers/client/useLocality"

const result: IResultInfo = {
    id: 'cxczz',
    courseId: 'sdsds',
    moduleId: 'sssds',
    user: {
        id: '2323232',
        firstName: 'מריה',
        lastName: 'סולומון',
        photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543346/image_37_ytyodi_1_fei18z.png"
    },
    grade: 100,
    status: 'submitted'
}

const AuthorBar = () => {

    const {direction, language} = useLocality()

    return (
        <div className="h-[80px] border-b border-b-[#dddddd] flex flex-col justify-center" dir={direction}>
            <div className="flex gap-6">
                <div className="flex flex-col justify-center">
                    <Avatar src={result.user.photo}/>
                </div>
                <div className="flex flex-col justify-center text-2xl">
                    {language === 'en' ? `Maria Solomon's Code Space` : 'מרחב הלמידה של מריה סולומון'}
                </div>
            </div>
        </div>
    )
}

export default AuthorBar