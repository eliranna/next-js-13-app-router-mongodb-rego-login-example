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
    title: string
}

interface ICourseStore {
    course?: ICourse,
    courses?: ICourse[],
}

interface ICourseService extends ICourseStore {
    getById: (id: string) => Promise<void>,
    getAll: () => Promise<void>,
}