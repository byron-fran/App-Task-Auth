import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar';
import ListTask from '../ListTask';
import useTask from '../../hooks/useTask';

const Home = () => {
  const {getAllTasks } = useTask();
  useEffect(() => {
    getAllTasks()
  }, [])
  return (
    <div>
      <NavBar/>
      <ListTask/>
    </div>
  )
}

export default Home