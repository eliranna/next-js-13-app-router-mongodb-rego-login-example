import { useFetch } from "_helpers/client";
import { create } from "zustand";

export { useCourseService };

const initialState = {
    course: undefined,
    courses: undefined
};

const courseStore = create<ICourseStore>(() => initialState);

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
        getAll: async () => {
            courseStore.setState({ courses: await fetch.get('/api/courses') });
        },
    }
}

export interface ICourse {
    _id: string,
    title: string,
    modules: IModule[]
}

export interface IModule {
    _id: string,
    title: string,
    items?: IModuleItem[]
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

export type IModuleItem = {
    _id: string;
    type: IModuleItemType;
    title: string,
    description?: string,
    initialCode?: string,
    questions?: IQuestion[]
}

interface ICourseStore {
    course?: ICourse,
    courses?: ICourse[],
}

interface ICourseService extends ICourseStore {
    getById: (id: string) => Promise<void>,
    getAll: () => Promise<void>,
}