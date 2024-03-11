import { ICourse } from "_services/useCourseService"
import Grid from "./base/Grid"
import { Page } from "./base/Page"
import Avatar from "./base/Avatar"

const Course = ({ course }: { course: ICourse}) => {
    console.log(course)
    return (
        <Page className='mt-20'>
            <Grid>
                <div className='lg:col-start-1 lg:col-span-4'>
                    {course.title}
                </div>
                <div className='lg:col-start-6 lg:col-span-7'>
                    Modules                              
                </div>
            </Grid>
        </Page>
    )
}

export default Course