import CourseCard from "./CourseCard";
import Grid from "./base/Grid";
import { Page } from "./base/Page";
import { useCourseService } from '_services';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import RootLayout from "./RootLayout";
import { useCaptions } from "_helpers/client/useCaptions";

const Dashboard = () => {

    const {courses, getUserCoursesSummary} = useCourseService();
    const router = useRouter()
    const {getCaption} = useCaptions()

    useEffect(() => {
        getUserCoursesSummary()
    }, [])

    const handleViewCourse = (courseId: string) => {
        router.push(`/course/${courseId}`)
    }

    return (
        <RootLayout>
            <Page>
                <Grid className='mt-20'>
                    <div className="lg:col-start-1 lg:col-span-3">
                        <span className='text-4xl'>
                            {getCaption('My Courses')}
                        </span>
                    </div>
                    <div className="lg:col-start-4 lg:col-span-7 flex gap-10">
                        {courses?.length && courses.map(course => (
                            <CourseCard key={course._id} course={course} onViewCourse={() => handleViewCourse(course._id)}/>
                        ))}              
                    </div>
                </Grid>
            </Page>
        </RootLayout>
      );
}

export default Dashboard