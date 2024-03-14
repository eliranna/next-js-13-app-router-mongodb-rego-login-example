import { ICourse, IModule } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import CourseModules from "./CourseModules"
import Section from "./Section"

const Course = ({ course, editMode }: { course: ICourse, editMode?: boolean }) => {
    return (
        <Section header={{
            topic: 'Course Page',
            title: course?.title,
            description: course?.description
        }}>
            <CourseModules courseId={course._id} modules={course.modules} editMode={editMode}/> 
        </Section>
    )
}

export default Course