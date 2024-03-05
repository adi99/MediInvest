import { useEffect } from 'react'
import AddButton from '../components/AddButton'
import CreateProject from '../components/CreateProject'
import HeroPeer from '../components/HeroPeer'
import Projects from '../components/ProjectsPeer'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'

const Home = () => {
  const [projects] = useGlobalState('projects')

  useEffect(async () => {
    await loadProjects()
  }, [])
  return (
    <>
    <HeroPeer />
    <Projects projects={projects} />
    <CreateProject />
    <AddButton />
  </>
  )
}

export default Home
