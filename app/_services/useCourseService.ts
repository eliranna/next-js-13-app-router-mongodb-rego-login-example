import { useFetch } from "_helpers/client";
import { create } from "zustand";

const initialState = {
    course: undefined,
    courses: undefined
};

interface ICourseStore {
    course?: ICourse,
    courses?: ICourseInfo[],
}

const courseStore = create<ICourseStore>(() => initialState);

interface ICourseService extends ICourseStore {
    getById: (id: string) => Promise<void>,
    getUserCoursesSummary: () => Promise<void>,
}

function useCourseService(): ICourseService {

    const { course, courses } = courseStore();
    const fetch = useFetch();

    return {
        course,
        courses,
        getById: async (id: string) => {
            courseStore.setState({ course: undefined });
            try {
                courseStore.setState({ course: await fetch.get(`/api/courses/${id}`) });
            } catch (error: any) {
                console.log(error)
                //alertService.error(error);
            }
        },
        getUserCoursesSummary: async () => {
            courseStore.setState({ courses: await fetch.get('/api/courses') });
        },
    }
}

export { useCourseService };

export interface ICourseInfo {
    _id: string,
    title: string,
    coverImage: string,
    location: string,
    dateAndTime: string,
    teacher?: {
        firstName: string,
        lastName: string,
        avatar: string
    }
}

export interface ICourse {
    _id: string,
    title: string,
    coverImage: string,
    description: string,
    modules: IModule[]
}

export interface IModule {
    _id: string,
    title: string,
    items?: IModuleItem[]
}

export type IModuleItem = {
    _id: string;
    type: IModuleItemType;
    title: string,
    description?: string,
    initialCode?: string,
    questions?: IQuestion[]
}

export type IInputType = 'text' | 'code' | 'math' | 'selection'

export type IAddition = {
  _id: string;
  type: IInputType,
  content?: string
}

export type IAnsware = {
  _id: string;
  content?: string
}

export interface IOption {
  _id: string;
  caption: string;
  isCorrect: boolean;
}

export interface IQuestion {
    _id: string;
    position: number;
    caption?: string;
    additions?: IAddition[];
    inputType?: IInputType;
    options?: IOption[];
    answare?: IAnsware;
}

export interface ICodingChallange {
    _id: string;
    type: IModuleItemType;
    title: string,
    description?: string,
    initialCode?: string
}

export type IModuleItemType = 'quiz' | 'codingChallenge'





