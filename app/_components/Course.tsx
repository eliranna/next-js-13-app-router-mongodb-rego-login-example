import { ICourse, IModule } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import CourseModules from "./CourseModules"
import ImageStrip from "./base/ImageStrip"

const Course = ({ course, editMode }: { course: ICourse, editMode?: boolean }) => {
    return (
        <div className="flex flex-col w-full">
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
                        <CourseModules courseId={course._id} modules={course.modules} editMode={editMode}/>                             
                    </div>
                </Grid>
            </Page>
        </div>
    )
}

export default Course