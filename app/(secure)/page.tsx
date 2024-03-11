'use client'
import { useEffect } from 'react'
import { useUserService } from '_services'
import Dashboard from '_components/Dashboard'
import Spinner from '_components/base/Spinner'

const Home = () => {

    const { currentUser, getCurrent } = useUserService();

    useEffect(() => {
        getCurrent();
    }, []);

    return currentUser ? <Dashboard/> : <Spinner/>

}

export default Home
