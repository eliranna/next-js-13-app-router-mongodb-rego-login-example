import mongoose from 'mongoose';
import { db } from './db';

const Course = db.Course;

export const coursesRepo = {
    getSummary,
    getById,
    getModuleItem
};

async function getSummary(coursesIds: string[]) {
    const objectIds = coursesIds.map(id => new mongoose.Types.ObjectId(id));
    return await Course.find({ _id: { $in: objectIds } });
}

async function getModuleItem(courseId: string, moduleId: string, itemId: string) {

  console.log(courseId, moduleId, itemId)
  try {
    // First, find the course with the specified courseId
    const course = await Course.findById(courseId);
    console.log(course)

    if (!course) {
      throw new Error('Course not found');
    }

    // Then, find the module within that course with the specified moduleId
    const module = course.modules.id(moduleId);
    console.log(module)

    if (!module) {
      throw new Error('Module not found');
    }

    // Finally, find the item within the module with the specified itemId
    const item = module.items.id(itemId);

    if (!item) {
      throw new Error('Item not found');
    }

    return item; // Return the found item
  } catch (error) {
    console.error('Error getting module item:', error);
    throw error; // Rethrow or handle error as appropriate for your application
  }
}

async function getById(id: string) {
    try {
        return await Course.findById(id)
    } catch {
        throw 'Course Not Found';
    }
}