import { apiHandler } from '_helpers/server/api';
import { coursesRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
});

async function getById(req: Request, { params: { courseId, moduleId, itemId } }: any) {
    return await coursesRepo.getModuleItem(courseId, moduleId, itemId);
}