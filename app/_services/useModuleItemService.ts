import { useFetch } from "_helpers/client";
import { create } from "zustand";
import { IModuleItem } from "./useCourseService";

export { useModuleItemService };

const initialState = {
    moduleItem: undefined
};

const moduleItemStore = create<IModuleItemStore>(() => initialState);

function useModuleItemService(): IModuleItemService {

    const { moduleItem } = moduleItemStore();
    const fetch = useFetch();

    return {
        moduleItem,
        getById: async (courseId: string, moduleId: string, itemId: string) => {
            moduleItemStore.setState({ moduleItem: undefined });
            try {
                moduleItemStore.setState({ moduleItem: await fetch.get(`/api/moduleItem/${courseId}/${moduleId}/${itemId}`) });
            } catch (error: any) {
                console.log(error)
                //alertService.error(error);
            }
        }
    }
}

interface IModuleItemStore {
    moduleItem?: IModuleItem
}

interface IModuleItemService extends IModuleItemStore {
    getById: (courseId: string, moduleId: string, itemId: string) => Promise<void>
}