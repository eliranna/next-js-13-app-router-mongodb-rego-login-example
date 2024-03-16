import { ICourse, IModule } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import CourseModules from "./CourseModules"
import Section from "./Section"
import { useCaptions } from "_helpers/client/useCaptions"

const Course = ({ course, editMode }: { course: ICourse, editMode?: boolean }) => {

    const { getCaption } = useCaptions()

    return (
        <Section header={{
            topic: getCaption('Course Page'),
            title: course?.title,
            description: course?.description
        }}>
            <CourseModules courseId={course._id} modules={course.modules}/> 
        </Section>
    )
}

export default Course