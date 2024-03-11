'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCourseService } from '_services';
import Spinner from '_components/base/Spinner';
import Course from '_components/Course';

const CoursePage = ({ params: { courseId } }: any) => {

    const router = useRouter();
    const {course, getById} = useCourseService();

    useEffect(() => {
        if (!courseId) return;
        getById(courseId)
    }, [router]);
    
    return course
        ? <Course course={course} />
        : <Spinner />;

}

export default CoursePage