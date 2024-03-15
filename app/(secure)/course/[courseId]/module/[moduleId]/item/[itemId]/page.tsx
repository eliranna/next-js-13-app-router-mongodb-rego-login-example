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
import RootLayout from '_components/RootLayout';
import { useSearchParams } from 'next/navigation'
import { useLocality } from '_helpers/client/useLocality';


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

    const router = useRouter();
    const { moduleItem, getById } = useModuleItemService();
    const { language } = useLocality()
    
    const searchParams = useSearchParams()
    const teacher = searchParams.get('teacher')

    console.log(teacher)

    useEffect(() => {
        if (!courseId && moduleId && itemId) return;
        getById(courseId, moduleId, itemId)
    }, [router]);

    const getModuleItem = (moduleItem: IModuleItem) => {
        switch (moduleItem.type) {
            case "codingChallenge":
                return (
                    <RootLayout hideFooter>
                        <Codespace task={moduleItem} isTeacher={teacher === 'true'} language={language}/>
                    </RootLayout>
                )
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

    return moduleItem ? getModuleItem(moduleItem) : <Spinner/>
}

export default ModuleItem