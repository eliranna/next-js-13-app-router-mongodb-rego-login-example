'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useModuleItemService } from "_services/useModuleItemService";
import Codespace from '_components/Codespace';
import Spinner from '_components/base/Spinner';
import { IModuleItem } from '_services/useCourseService';
import Quiz from '_components/Quiz';
import { Page } from '_components/base/Page';
import Grid from '_components/base/Grid';
import { useUserService } from '_services';
import RootLayout from '_components/RootLayout';

const QuizPage = ({quiz}: {quiz: IModuleItem}) => {
    return (
        <Page>
            <Grid>
                <div className="lg:col-start-2 lg:col-span-9 pt-20">
                    {quiz ? <Quiz quiz={quiz}/> : <Spinner/>}
                </div>
            </Grid>
        </Page>        
    )
}

const ModuleItem = ({ params: { courseId, moduleId, itemId } }: any) => {

    const editMode = true

    const router = useRouter();
    const { moduleItem, getById } = useModuleItemService();

    const getModuleItem = (moduleItem: IModuleItem) => {
        console.log(moduleItem)
        switch (moduleItem.type) {
            case "codingChallenge":
                return <Codespace task={moduleItem} editMode={editMode}/>
            case 'quiz':
                return (
                    <RootLayout>
                        <QuizPage quiz={moduleItem}/>
                    </RootLayout>
                )
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