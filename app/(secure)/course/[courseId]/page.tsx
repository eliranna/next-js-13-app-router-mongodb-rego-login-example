'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCourseService } from '_services';
import Spinner from '_components/base/Spinner';
import Course from '_components/Course';
import { useEditMode } from '_helpers/client/useEditMode';

const CoursePage = ({ params: { courseId } }: any) => {

    const { isEditMode } = useEditMode();
    const router = useRouter();
    const {course, getById} = useCourseService();

    useEffect(() => {
        if (!courseId) return;
        getById(courseId)
    }, [router, isEditMode]);
    
    return course ? <Course course={course} editMode={isEditMode}/> : <Spinner/>

}

export default CoursePage