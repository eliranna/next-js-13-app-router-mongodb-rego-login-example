import { ICourse, IModule } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import CourseModules from "./CourseModules"

const modules: IModule[] = [
    {
        _id: '1',
        title: 'Before the Civil War'
    }
]


const Course = ({ course }: { course: ICourse}) => {
    console.log(course)
    return (
        <Page className='mt-20'>
            <Grid>
                <div className='lg:col-start-1 lg:col-span-4'>
                    {course.title}
                </div>
                <div className='lg:col-start-6 lg:col-span-7'>
                    <CourseModules modules={modules}/>                             
                </div>
            </Grid>
        </Page>
    )
}

export default Course