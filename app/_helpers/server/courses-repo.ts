import mongoose from 'mongoose';
import { db } from './db';

const Course = db.Course;

export const coursesRepo = {
    getSummary,
    getById
};

async function getSummary(coursesIds: string[]) {
    const objectIds = coursesIds.map(id => new mongoose.Types.ObjectId(id));
    return await Course.find({ _id: { $in: objectIds } });
}

async function getById(id: string) {
    try {
        return await Course.findById(id)
    } catch {
        throw 'Course Not Found';
    }
}