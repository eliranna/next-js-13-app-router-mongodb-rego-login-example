import { apiHandler } from '_helpers/server/api';
import { usersRepo } from '_helpers/server';
import { coursesRepo } from '_helpers/server/courses-repo';

module.exports = apiHandler({
    GET: getAllAttending
});

async function getAllAttending() {
    const currentUser = await usersRepo.getCurrent()
    const attending = currentUser.coursesAttending
    return await coursesRepo.getSummary(attending)
}

