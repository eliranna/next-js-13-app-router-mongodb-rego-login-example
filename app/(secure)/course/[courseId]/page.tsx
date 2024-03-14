'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCourseService, useUserService } from '_services';
import Spinner from '_components/base/Spinner';
import Course from '_components/Course';
import RootLayout from '_components/RootLayout';

const CoursePage = ({ params: { courseId } }: any) => {

    const editMode = false

    const router = useRouter();
    const {course, getById} = useCourseService();

    useEffect(() => {
        if (!courseId) return;
        getById(courseId)
    }, [router]);
    
    return (
        <RootLayout>
            {course ? <Course course={course} editMode={editMode}/> : <Spinner/>}
        </RootLayout>
    )

}

export default CoursePage