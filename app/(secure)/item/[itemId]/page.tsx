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
                firstName: 'Eliran',
                lastName: 'Natan',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1686484160/118732079_10223558435893099_3741007992127305573_n_i30ygn.jpg"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Noa',
                lastName: 'Maller',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1689274114/1686386684251_enpdz9.jpg"
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
                firstName: 'Noa',
                lastName: 'Maller',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1689274114/1686386684251_enpdz9.jpg"
            },
            status: 'notStarted'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Noa',
                lastName: 'Maller',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1689274114/1686386684251_enpdz9.jpg"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Noa',
                lastName: 'Maller',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1689274114/1686386684251_enpdz9.jpg"
            },
            status: 'inProgress'
        },
        {
            id: 'cxczz',
            courseId: 'sdsds',
            moduleId: 'sssds',
            user: {
                id: '2323232',
                firstName: 'Noa',
                lastName: 'Maller',
                photo: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1689274114/1686386684251_enpdz9.jpg"
            },
            grade: 95,
            status: 'submitted'
        },

    ]

    const handleViewResult = (result: IResultInfo) => {
        router.push(`/course/${result.courseId}/module/${result.moduleId}/item/${result.id}`)
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