import { IUserInfo } from "./useUserService";

export type Status = 'notStarted' | 'inProgress' | 'submitted'

export interface IResultInfo {
    id: string,
    courseId: string,
    moduleId: string,
    user: IUserInfo,
    status: Status,
    grade?: number,
}