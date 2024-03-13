'use client'

import Result from "_components/Result"
import RootLayout from "_components/RootLayout"
import Grid from "_components/base/Grid"
import { Page } from "_components/base/Page"
import TextInput from "_components/base/TextInput"
import { IModuleItem } from "_services"
import { IResultInfo, Status } from "_services/useResultsService"

type IStatus = {
    caption: string,
    count: number,
    icon: string
}

const ItemPage = ({ params: { itemId } }: any) => {

    // Here we need to fetch fromA nswares table all records with itemId===itemId
    // then we show a list of all students who started the item.
    // click on list reocrd would lead to item solution (but for this we need courseId and moduleId...)
    // Well, each item is specific for module and course so we can include this info in the item itself..

    const item: IModuleItem = {
        _id: 'asdasdaa',
        type: 'codingChallenge',
        title: 'Rock, Paper, Scissors, Python!',
        description: "Write a Rock, Paper, Scissors game that the user plays against the computer."
    }

    const results: IResultInfo[] = [
        {
            id: 'asdasas',
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

    const statusSummary: IStatus[] = [
        {
            caption: 'Started',
            count: results.filter(result => result.status === 'notStarted').length,
            icon: '/icons/gray-circle.svg'
        },
        {
            caption: 'In Progress',
            count: results.filter(result => result.status === 'inProgress').length,
            icon: '/icons/dots.svg'
        },
        {
            caption: 'Submitted',
            count: results.filter(result => result.status === 'submitted').length,
            icon: '/icons/check.svg'
        },
    ]

    const StatusInfo = ({icon, count, caption}: {icon: string, count: number, caption: string}) => (
        <div className="flex gap-4">
            <div className="flex flex-col justify-center">
                <img src={icon} className="w-[35px]"/>
            </div>
            <div className="flex flex-col justify-center">
                <span>
                    {`${count} ${caption}`}
                </span>
            </div>
        </div>
    )

    const StatusBar = ({statusSummary}: {statusSummary: any}) => {
        return statusSummary.map((status: IStatus) => (
            <div>
                <StatusInfo icon={status.icon} count={status.count} caption={status.caption}/>
            </div>
        ))
    }

    const ChallengeHeader = ({item, statusSummary}: {item: IModuleItem, statusSummary: IStatus[]}) => (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="uppercase text-dark-gray font-semibold">
                            Challenge results
                        </span>
                    </div>
                    <div>
                        <span className='text-4xl'>
                            {item.title}
                        </span>                                
                    </div>
                </div>
                <div>
                    <span>
                        {item.description}
                    </span>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-3">
                    <StatusBar statusSummary={statusSummary}/>
                </div>
            </div>
        </div>
    )

    return (
        <RootLayout>
            <Page>
                <Grid className='mt-20'>
                    <div className="lg:col-start-1 lg:col-span-3">
                        <ChallengeHeader item={item} statusSummary={statusSummary}/>
                    </div>
                    <div className="lg:col-start-5 lg:col-span-6 flex gap-6">
                        <div className="flex flex-col w-full gap-10">
                            <div>
                                <TextInput eng placeholder="Search student" className="text-2xl"/>
                            </div>
                            <div className="flex flex-row gap-6 w-full flex-wrap">
                                {results.map((result: IResultInfo) => {
                                    return (
                                        <div key={result.id} className="w-full">
                                            <Result result={result}/>
                                        </div>
                                    )
                                })} 
                            </div>
                        </div>
                    </div>
                </Grid>
            </Page>
        </RootLayout>
    )
}

export default ItemPage