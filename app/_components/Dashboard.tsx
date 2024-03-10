import Link from "next/link";
import CourseCard from "./CourseCard";
import RootLayout from "./RootLayout";
import Grid from "./base/Grid";
import { Page } from "./base/Page";
import { Course, CourseSummary } from "_types/Course";

const Dashboard = () => {

    const courses: CourseSummary[] = []

    return (
        <Page>
            <Grid className='mt-20'>
                <div className="lg:col-start-1 lg:col-span-3">
                    <span className='text-4xl'>
                        Courses
                    </span>
                </div>
                <div className="lg:col-start-4 lg:col-span-7 flex gap-6">
                {courses.map(course => (
                    <Link href={`course/${course.iid}`}>
                    <CourseCard course={course}/>
                    </Link>
                ))}              
                </div>
            </Grid>
        </Page>
      );
}

export default Dashboard