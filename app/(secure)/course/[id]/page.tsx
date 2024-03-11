'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCourseService } from '_services';
import Spinner from '_components/base/Spinner';
import Course from '_components/Course';

const CoursePage = ({ params: { id } }: any) => {

    const router = useRouter();
    const {course, getById} = useCourseService();

    useEffect(() => {
        console.log(id)
        if (!id) return;
        getById(id)
    }, [router]);
    
    useEffect(() => {
        console.log(course)
    }, [course])

    return course
        ? <Course course={course} />
        : <Spinner />;

}

export default CoursePage