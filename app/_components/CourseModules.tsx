import { IModule } from "_services/useCourseService"
import Accordion from "./base/Accordion"

const CourseModules = ({ modules }: {modules: IModule[]}) => {
    return (
        <Accordion items={modules}/>
    )
}

export default CourseModules