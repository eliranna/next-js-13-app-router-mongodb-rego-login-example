'use client'

import { useRouter } from 'next/navigation';
import Result from "_components/Result"
import TextInput from "_components/base/TextInput"
import { IModuleItem } from "_services"
import { IResultInfo, Status } from "_services/useResultsService"
import Section from '_components/Section';

const ItemPage = ({ params: { itemId } }: any) => {

    const router = useRouter();

    // Here we need to fetch fromA nswares table all records with itemId===itemId
    // then we show a list of all students who started the item.
    // click on list reocrd would lead to item solution (but for this we need courseId and moduleId...)
    // Well, each item is specific for module and course so we can include this info in the item itself..

    const item: IModuleItem = {
        _id: 'asdasdaa',
        type: 'codingChallenge',
        title: 'Rock, Paper, Scissors, Python!',
        description: "Write a Rock, Paper, Scissors game that the user plays against the computer. Write a Rock, Paper, Scissors game that the user plays against the computer."
    }

    const results: IResultInfo[] = [
        {
            id: 'asdasas',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '232323',
                firstName: 'Noa',
                lastName: 'Fayberg',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543269/image_40_sx7mjc.png"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Maria',
                lastName: 'Solomon',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543346/image_37_ytyodi_1_fei18z.png"
            },
            grade: 100,
            status: 'submitted'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Lin',
                lastName: 'Kuman',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543457/elirannatan_A_13_year_old_american_korean_student_wearing_black_fc4b7b83-58f4-4480-a6d2-cb874b754aa9_v49avg_1_iu6asw.png"
            },
            status: 'notStarted'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Israel',
                lastName: 'Nagamo',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543526/0_0_ssjld9_1_umda6n.png"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Michael',
                lastName: 'Hucktain',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543587/elirannatan_A_cheerful_15_year_old_american_asian_teenage_boy_m_e3385d99-d824-4ac7-8971-cb84ac4d8107_m6rbh3_1_n8ftlq.png"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Amira',
                lastName: 'Hijabar',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710543651/elirannatan_A_cheerful_15_year_old_american_asian_female_wearin_683939c7-2e84-4c52-a85f-f7b607eec07c_mptb2e_1_ycqvvu.png"
            },
            grade: 95,
            status: 'submitted'
        },

    ]

    const handleViewResult = (result: IResultInfo) => {
        router.push(`/course/${result.courseId}/module/${result.moduleId}/item/${result.id}?teacher=true`)
    }

    return (
        <Section nerrow header={{
            topic: 'Challenge Results',
            title: item.title,
            description: item.description
        }}>
            <div className="flex flex-col w-full gap-10">
                <div>
                    <TextInput eng placeholder="Search student" className="text-2xl"/>
                </div>
                <div className="flex flex-row gap-4 w-full flex-wrap">
                    {results.map((result: IResultInfo) => {
                        return (
                            <div key={result.id} className="w-full">
                                <Result result={result} onViewResult={() => handleViewResult(result)}/>
                            </div>
                        )
                    })} 
                </div>
            </div>
        </Section>
    )
}

export default ItemPage