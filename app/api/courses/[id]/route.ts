import { apiHandler } from '_helpers/server/api';
import { coursesRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
});

async function getById(req: Request, { params: { id } }: any) {
    return await coursesRepo.getById(id);
}

/*
async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await coursesRepo.update(id, body);
}

update.schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    username: joi.string(),
    password: joi.string().min(6).allow(''),
});
*/