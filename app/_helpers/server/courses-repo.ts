import { db } from './db';

const Course = db.Course;

export const coursesRepo = {
    getSummary
};

async function getSummary(coursesIds: string[]) {
    return await Course.find({ courseId: { $in: coursesIds } })
}

