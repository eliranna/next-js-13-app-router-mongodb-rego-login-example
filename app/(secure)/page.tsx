'use client'
import { useEffect } from 'react'
import { useUserService } from '_services'
import { Spinner } from '_components'
import Dashboard from '_components/Dashboard'

const Home = () => {

    const { currentUser, getCurrent } = useUserService();

    useEffect(() => {
        getCurrent();
    }, []);

    return currentUser ? <Dashboard/> : <Spinner/>

}

export default Home
