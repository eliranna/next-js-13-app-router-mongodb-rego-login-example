import { ICourse, IModule } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import CourseModules from "./CourseModules"

const Course = ({ course }: { course: ICourse }) => {
    return (
        <Page className='mt-20'>
            <Grid>
                <div className='lg:col-start-1 lg:col-span-4'>
                    <div>
                        <span className='text-5xl leading-snug font-light'>
                            {course?.title}
                        </span>
                    </div>
                </div>
                <div className='lg:col-start-6 lg:col-span-7'>
                    <CourseModules courseId={course._id} modules={course.modules}/>                             
                </div>
            </Grid>
        </Page>
    )
}

export default Course