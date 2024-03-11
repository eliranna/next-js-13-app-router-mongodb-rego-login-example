import Link from "next/link";
import CourseCard from "./CourseCard";
import Grid from "./base/Grid";
import { Page } from "./base/Page";
import { useCourseService } from '_services';
import { useEffect } from "react";

const Dashboard = () => {

    const {courses, getAll} = useCourseService();

    useEffect(() => {
        getAll()
    }, [])

    return (
        <Page>
            <Grid className='mt-20'>
                <div className="lg:col-start-1 lg:col-span-3">
                    <span className='text-4xl'>
                        Courses
                    </span>
                </div>
                <div className="lg:col-start-4 lg:col-span-7 flex gap-6">
                {courses?.length && courses.map(course => (
                    <Link key={course.courseId} href={`course/${course.courseId}`}>
                        {course.title}
                    </Link>
                ))}              
                </div>
            </Grid>
        </Page>
      );
}

export default Dashboard