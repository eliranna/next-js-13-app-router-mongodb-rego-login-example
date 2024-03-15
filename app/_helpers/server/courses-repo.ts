import mongoose from 'mongoose';
import { db } from './db';
import { ICourseInfo, IUser } from '_services';

const Course = db.Course;
const User = db.User;

export const coursesRepo = {
    getSummary,
    getById,
    getModuleItem
};

async function getSummary(coursesIds: string[]): Promise<ICourseInfo[]> {

    const objectIds = coursesIds.map(id => new mongoose.Types.ObjectId(id));

    try {
      const courseInfo: ICourseInfo[] = await Course.find({ _id: { $in: objectIds } }, { 
        _id: 1, 
        title: 1, 
        description: 1,
        coverImage: 1,
        location: 1, 
        dateAndTime: 1
      });
      return courseInfo
    } catch (e) {
      throw e
    }

}

async function getModuleItem(courseId: string, moduleId: string, itemId: string) {

  try {
    // First, find the course with the specified courseId
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    // Then, find the module within that course with the specified moduleId
    const courseModule = course.modules.id(moduleId);

    if (!courseModule) {
      throw new Error('Module not found');
    }

    // Finally, find the item within the module with the specified itemId
    const item = courseModule.items.id(itemId);

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