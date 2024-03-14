import { IResultInfo, Status } from "_services/useResultsService"
import Avatar from "./base/Avatar"
import Button from "./base/Button"
import Chip from "./base/Chip"

const ProgressIndicator = ({status}: {status: Status}) => {
    const getIcon = (status: Status) => {
        switch (status) {
            case 'notStarted':
                return '/icons/gray-circle.svg'
            case 'inProgress':
                return '/icons/dots.svg'
            case 'submitted':
                return '/icons/check.svg'                
        }
    }
    return (
        <div>
            <img src={getIcon(status)} className="w-[30px]"/>
        </div>
    )
}

const GradeIndicator = ({grade}: {grade: number}) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="flex flex-col justify-center">
                <Chip id={'grade'} caption={`${grade}`} className="text-lg font-bold text-dark-gray"/>
            </div>
        </div>
    )
}

const Result = ({result, onViewResult}: {result: IResultInfo, onViewResult: any}) => {
    return (
        <div className="w-full rounded-md p-4 border border-gray cursor-pointer px-4" onClick={onViewResult}>
            <div className="flex flex-row justify-between">
                <div className="flex gap-4">
                    <div className="h-full flex flex-col justify-center">
                        <Avatar size={45} src={result.user.photo}/>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <span className="text-lg font-medium">
                                {`${result.user.firstName} ${result.user.lastName}`}
                            </span>
                        </div>
                        <div>
                            <div className="text-sm text-dark-gray">
                                Started 2 days ago
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center gap-3">
                    {result.grade && (
                        <div>
                            <GradeIndicator grade={result.grade}/>
                        </div>
                    )}
                    <div>
                        {result.status === 'submitted' && <ProgressIndicator status={result.status}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result