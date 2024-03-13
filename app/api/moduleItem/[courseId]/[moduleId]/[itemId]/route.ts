import { apiHandler } from '_helpers/server/api';
import { coursesRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
});

async function getById(req: Request, { params: { courseId, moduleId, itemId } }: any) {
    // Here: we need to check current user and check if he had
    // answare to this item. If yes, bring the answare. If not, bring the new item.
    // (teacher will not have a answare for this item)
    return await coursesRepo.getModuleItem(courseId, moduleId, itemId);
}