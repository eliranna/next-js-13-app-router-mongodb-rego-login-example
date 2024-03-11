'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useModuleItemService } from "_services/useModuleItemService";
import Codespace from '_components/Codespace';
import Spinner from '_components/base/Spinner';
import { IModuleItem } from '_services/useCourseService';

const ModuleItem = ({ params: { courseId, moduleId, itemId } }: any) => {

    const router = useRouter();
    const { moduleItem, getById } = useModuleItemService();

    const getModuleItem = (moduleItem: IModuleItem) => {
        console.log(moduleItem)
        switch (moduleItem.type) {
            case "codingChallenge":
                console.log(moduleItem)
                return <Codespace task={moduleItem}/>
            case 'exercise':
                return <div>quiz</div>
            default:
                break;
        }
    }

    useEffect(() => {
        if (!courseId && moduleId && itemId) return;
        getById(courseId, moduleId, itemId)
    }, [router]);

    return moduleItem ? getModuleItem(moduleItem) : <Spinner/>
}

export default ModuleItem