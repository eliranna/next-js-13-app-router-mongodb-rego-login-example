import { useFetch } from "_helpers/client";
import { create } from "zustand";

export { useCourseService };

const initialState = {
    courses: undefined
};

const courseStore = create<ICourseStore>(() => initialState);

function useCourseService(): ICourseService {

    const { courses } = courseStore();
    const fetch = useFetch();

    return {
        courses,
        getAll: async () => {
            courseStore.setState({ courses: await fetch.get('/api/courses') });
        },
    }
}

interface ICourse {
    courseId: string,
    title: string
}

interface ICourseStore {
    courses?: ICourse[],
}

interface ICourseService extends ICourseStore {
    getAll: () => Promise<void>,
}